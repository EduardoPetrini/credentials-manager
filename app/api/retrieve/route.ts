import { getDbClient } from '@/lib/database';

export async function POST(req: Request) {
  const { domain, session } = await req.json();
  if (!session) {
    throw new Error('Session is required');
  }

  const connection = await getDbClient();

  const { id: userKey } = session;
  const reg = new RegExp(`.*${domain}.*`);

  const credentials = await connection
    .collection('credentials')
    .find({ userKey, domain: { $regex: reg } })
    .toArray();
  console.log('found', credentials.length);
  return new Response(JSON.stringify(credentials));
}
