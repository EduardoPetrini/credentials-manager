import { getDbClient } from '@/lib/database';
import generatePassword from '@/lib/password';

export default async function POST(req: Request) {
  const password = generatePassword({ passwordLength: 8, useNumbers: true, useSpecialChars: true, useUpperCase: true });
  console.log('password', password);

  return password;
}
