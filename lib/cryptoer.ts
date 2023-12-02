import * as crypto from 'crypto';

const { CRYPTO_KEY = '123', CRYPTO_IV = '123' } = process.env;

const key = crypto.createHash('sha512').update(CRYPTO_KEY).digest('hex').substring(0, 32);
const encryptionIV = crypto.createHash('sha512').update(CRYPTO_IV).digest('hex').substring(0, 16);

export const encrypt = (text: string) => {
  crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, encryptionIV);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decrypt = (encryptedText: string) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, encryptionIV);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};
