import { getDbClient } from '@/lib/database';

export default async function POST(req: Request) {
  const { domain, password } = await req.json();
  const connection = await getDbClient();

  await connection.collection('credentials').insertOne({ domain, password });
  return 'ok';
}
