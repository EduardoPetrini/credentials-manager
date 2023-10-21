import { getDbClient } from '@/lib/database';

export async function POST(req: Request) {
  const { domain } = await req.json();
  const connection = await getDbClient();

  const reg = new RegExp(`.*${domain}.*`);
  console.log('search', domain, reg);

  const credentials = await connection
    .collection('credentials')
    .find({ domain: { $regex: reg } })
    .toArray();
  console.log('found', credentials);
  return new Response(JSON.stringify(credentials));
}
