import { NextApiResponse } from 'next';

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.text();

  console.log('here', body);
  return new Response('ok')
}
