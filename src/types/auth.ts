export type AuthUser = {
  id: string;
  name: string;
  email: string;
  customerId: number;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  name: string;
  email: string;
  password: string;
};
