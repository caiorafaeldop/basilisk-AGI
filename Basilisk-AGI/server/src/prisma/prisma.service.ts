import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      // Configurações para MongoDB local sem replica set
      log: ['warn', 'error'],
    });
  }

  async onModuleInit() {
    try {
      console.log('🔄 Tentando conectar ao MongoDB...');
      console.log('🔗 Cluster:', process.env.DATABASE_URL?.match(/[@]([^.]+)/)?.[1] || 'Local');
      console.log('🌍 Environment:', process.env.NODE_ENV);
      console.log('🖥️ Platform:', process.env.RENDER ? 'Render' : 'Local');
      console.log('📊 Database: MongoDB');
      
      // Timeout personalizado
      const connectPromise = this.$connect();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout after 15s')), 15000)
      );
      
      await Promise.race([connectPromise, timeoutPromise]);
      
      console.log('✅ MongoDB connected successfully');
      console.log('⚠️ Running without transactions (local MongoDB)');
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error.message);
      console.error('❌ Error type:', error.constructor.name);
      
      // Não falha a aplicação
      console.log('⚠️ App will continue without database');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
