import * as crypto from 'crypto';

const getKeys = () => {
  const { CRYPTO_KEY, CRYPTO_IV } = process.env;

  if (CRYPTO_KEY == undefined) {
    throw new Error('NO CRYPTO KEY');
  }

  if (CRYPTO_IV == undefined) {
    throw new Error('NO CRYPTO IV');
  }
  const key = crypto.createHash('sha512').update(CRYPTO_KEY).digest('hex').substring(0, 32);
  const encryptionIV = crypto.createHash('sha512').update(CRYPTO_IV).digest('hex').substring(0, 16);

  return { key, encryptionIV };
};

export const encrypt = (text: string) => {
  const { key, encryptionIV } = getKeys();
  crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, encryptionIV);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

export const decrypt = (encryptedText: string) => {
  const { key, encryptionIV } = getKeys();
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, encryptionIV);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};
