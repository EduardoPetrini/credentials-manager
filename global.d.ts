import { MongoClient, Db } from 'mongodb';

declare global {
  var dbClient: Db;
}
