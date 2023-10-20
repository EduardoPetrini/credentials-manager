import { getDbClient } from '@/lib/database';

export default async function POST(req: Request) {
  const {domain} = await req.json();
  const connection = await getDbClient();

  const credentials = connection.collection('credentials').find({domain}).toArray();

  return credentials;
}
  
