export interface DecodedToken {
  email: string;
  resetToken: string;
  confirmToken: string;
  iat: number;
  exp: number;
}
