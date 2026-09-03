export interface User {
  name: string;
  email: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface SignupData extends Credentials {
  name: string;
}

export type AuthResult = { ok: boolean; error?: string };
