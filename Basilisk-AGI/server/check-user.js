const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function checkAndCreateUser() {
  const client = new MongoClient('mongodb://localhost:27017');
  
  try {
    await client.connect();
    console.log('✅ Conectado ao MongoDB');
    
    const db = client.db('Basilisk');
    const usersCollection = db.collection('users');
    
    // Verificar usuários existentes
    const users = await usersCollection.find().toArray();
    console.log('\n📋 Usuários no banco:', users.length);
    
    if (users.length > 0) {
      console.log('\nUsuários encontrados:');
      users.forEach(user => {
        console.log(`- Email: ${user.email}, Nome: ${user.name}`);
      });
    }
    
    // Verificar se existe admin@gmail.com
    const adminUser = await usersCollection.findOne({ email: 'admin@gmail.com' });
    
    if (!adminUser) {
      console.log('\n⚠️  Usuário admin@gmail.com não encontrado!');
      console.log('🔧 Criando usuário admin...');
      
      const hashedPassword = await bcrypt.hash('123456', 10);
      
      const newUser = {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      await usersCollection.insertOne(newUser);
      console.log('✅ Usuário admin criado com sucesso!');
      console.log('   Email: admin@gmail.com');
      console.log('   Senha: 123456');
    } else {
      console.log('\n✅ Usuário admin@gmail.com já existe!');
      
      // Atualizar senha para garantir que é 123456
      console.log('🔧 Atualizando senha para 123456...');
      const hashedPassword = await bcrypt.hash('123456', 10);
      await usersCollection.updateOne(
        { email: 'admin@gmail.com' },
        { $set: { password: hashedPassword, updatedAt: new Date() } }
      );
      console.log('✅ Senha atualizada!');
    }
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await client.close();
  }
}

checkAndCreateUser();
