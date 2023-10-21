import { getDbClient } from '@/lib/database';
import generatePassword from '@/lib/password';

export async function POST(req: Request) {
  const password = generatePassword({ passwordLength: 12, useNumbers: true, useSpecialChars: true, useUpperCase: true });
  console.log('password', password);

  return new Response(password);
}
