declare type PasswordGenerate = {
  passwordLength: number;
  useUpperCase: boolean;
  useNumbers: boolean;
  useSpecialChars: boolean;
};

declare type CredentialType = {
  domain: string;
  login: string;
  password: string;
};
