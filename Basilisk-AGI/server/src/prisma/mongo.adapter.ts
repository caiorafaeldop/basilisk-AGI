import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

interface MongoCommandResult {
  cursor?: {
    firstBatch?: any[];
  };
  n?: number;
  inserted?: any[];
}

/**
 * Adapter para operações MongoDB sem replica set
 * Usa comandos raw para evitar transações
 */
@Injectable()
export class MongoAdapter {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um documento usando comando raw (sem transação)
   */
  async createDocument(collection: string, data: any): Promise<any> {
    try {
      const result = await this.prisma.$runCommandRaw({
        insert: collection,
        documents: [data],
      }) as MongoCommandResult;

      if (result.n === 1) {
        // Busca o documento criado
        const created = await this.prisma.$runCommandRaw({
          find: collection,
          filter: { _id: result.inserted?.[0]?._id || data._id },
          limit: 1,
        }) as MongoCommandResult;
        
        let doc = created.cursor?.firstBatch?.[0] || data;
        
        if (doc) {
          // Normalizar _id para id
          doc.id = this.normalizeId(doc._id);
          // Normalizar datas
          doc = this.normalizeDates(doc);
        }
        
        return doc;
      }
      
      throw new Error('Failed to create document');
    } catch (error) {
      console.error('MongoAdapter createDocument error:', error);
      throw error;
    }
  }

  /**
   * Atualiza um documento usando comando raw (sem transação)
   */
  async updateDocument(collection: string, filter: any, update: any): Promise<any> {
    try {
      await this.prisma.$runCommandRaw({
        update: collection,
        updates: [
          {
            q: filter,
            u: { $set: update },
          },
        ],
      });

      // Busca o documento atualizado
      const updated = await this.prisma.$runCommandRaw({
        find: collection,
        filter,
        limit: 1,
      }) as MongoCommandResult;

      let doc = updated.cursor?.firstBatch?.[0];
      
      if (doc) {
        // Normalizar _id para id
        doc.id = this.normalizeId(doc._id);
        // Normalizar datas
        doc = this.normalizeDates(doc);
      }
      
      return doc;
    } catch (error) {
      console.error('MongoAdapter updateDocument error:', error);
      throw error;
    }
  }

  /**
   * Converte ObjectId do MongoDB para string
   */
  private normalizeId(id: any): string {
    if (!id) return id;
    if (typeof id === 'string') return id;
    if (id.$oid) return id.$oid;
    return String(id);
  }

  /**
   * Converte datas string para Date
   */
  private normalizeDates(doc: any): any {
    if (!doc) return doc;
    
    // Converter createdAt e updatedAt se forem strings
    if (doc.createdAt && typeof doc.createdAt === 'string') {
      doc.createdAt = new Date(doc.createdAt);
    }
    if (doc.updatedAt && typeof doc.updatedAt === 'string') {
      doc.updatedAt = new Date(doc.updatedAt);
    }
    
    return doc;
  }

  /**
   * Busca um documento
   */
  async findOne(collection: string, filter: any): Promise<any> {
    try {
      const result = await this.prisma.$runCommandRaw({
        find: collection,
        filter,
        limit: 1,
      }) as MongoCommandResult;

      let doc = result.cursor?.firstBatch?.[0] || null;
      
      if (doc) {
        // Normalizar _id para id (compatibilidade com Prisma)
        doc.id = this.normalizeId(doc._id);
        // Normalizar datas
        doc = this.normalizeDates(doc);
      }
      
      return doc;
    } catch (error) {
      console.error('MongoAdapter findOne error:', error);
      return null;
    }
  }
}
