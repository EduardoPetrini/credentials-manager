import { getDbClient } from '@/lib/database';

export async function POST(req: Request) {
  const { domain, login, password, userKey = 'UU0oSnhzdXBHdjhvNi0heVpjdTFQOGFRMGdLLVZMbURkTCF5aXhQb01fWVZQYjAkMm1MVUl1eg==' } = await req.json();
  const connection = await getDbClient();

  await connection.collection('credentials').insertOne({ domain, login, password, userKey });
  return new Response('ok');
}
