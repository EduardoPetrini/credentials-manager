declare type PasswordGenerate = {
  passwordLength: number;
  useUpperCase: boolean;
  useNumbers: boolean;
  useSpecialChars: boolean;
};

declare type CredentialType = {
  _id?: string;
  domain: string;
  login: string;
  password: string;
};
