import {MongoClient} from 'mongodb';

export async function getDbClient() {
  if (!global.dbClient) {
    const client = new MongoClient('mongodb://localhost:27017', {});
    const connection = await client.connect().catch(console.error);
    if (connection instanceof MongoClient) {
      global.dbClient = connection.db('credential_manager');
    }

  }

  return global.dbClient;
}
