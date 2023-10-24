import { getDbClient } from '@/lib/database';

export async function POST(req: Request) {
  const { domain, login, password, session } = await req.json();

  if (!session) {
    throw new Error('Session is required');
  }
  
  const connection = await getDbClient();
  const { id: userKey } = session;
  await connection.collection('credentials').insertOne({ domain, login, password, userKey });
  return new Response('ok');
}
