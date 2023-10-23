import bcrypt from 'bcrypt';

import { getDbClient } from '@/lib/database';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!username || !password) {
    return new Response(null);
  }

  const connection = await getDbClient();

  const fullUser = await connection.collection('users').findOne({ username });

  if (!fullUser) {
    return new Response(null);
  }

  try {
    const match = await bcrypt.compare(password, fullUser.password);
    if (!match) {
      throw new Error('password doenst match');
    }
  } catch (error) {
    console.log('password doenst match');
    return new Response(null);
  }

  const user = {
    id: fullUser.id,
    name: fullUser.name,
    email: fullUser.email,
  };

  return new Response(JSON.stringify(user));
}
