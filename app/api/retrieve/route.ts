import { decrypt } from '@/lib/cryptoer';
import { getDbClient } from '@/lib/database';

export async function POST(req: Request) {
  const { domain, session } = await req.json();
  if (!session) {
    throw new Error('Session is required');
  }

  const connection = await getDbClient();

  const { id: userKey } = session;
  const reg = new RegExp(`.*${domain}.*`, 'i');

  const credentials = await connection
    .collection('credentials')
    .find({ userKey, domain: { $regex: reg } })
    .toArray();
  console.log('found', credentials.length);

  const decrypted = credentials.map((cred) => ({
    ...cred,
    password: decrypt(cred.password)
  }))
  return new Response(JSON.stringify(decrypted));
}
