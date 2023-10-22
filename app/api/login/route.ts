export async function POST(req: Request) {
  const body = await req.json();
  console.log('login', body);

  return new Response(JSON.stringify({ id: 1, name: 'J Smith', email: 'jsmith@example.com' }));
}
