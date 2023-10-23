import { MongoClient } from 'mongodb';

const { MONGODB_URL = 'mongodb://localhost:27017' } = process.env;

export async function getDbClient() {
  if (!global.dbClient) {
    const client = new MongoClient(MONGODB_URL, {});
    const connection = await client.connect().catch(console.error);
    if (connection instanceof MongoClient) {
      global.dbClient = connection.db('credential_manager');
    }
  }

  return global.dbClient;
}
