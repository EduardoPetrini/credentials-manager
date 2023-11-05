import { getDbClient } from '@/lib/database';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  const json = await req.json();
  const { credId, session } = json;
  if (!session) {
    throw new Error('Session is required');
  }

  const { id: userKey } = session;

  console.log('deleting', credId);
  const connection = await getDbClient();

  await connection.collection('credentials').deleteOne({ _id: new ObjectId(credId), userKey });
  return new Response('ok');
}
