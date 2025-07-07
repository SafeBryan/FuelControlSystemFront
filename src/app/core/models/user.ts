export interface User {
  id?: string; // Opcional para creación
  username: string;
  email: string;
  password?: string;
  roles: number[];
  refreshToken?: string;
  refreshTokenExpiryTime?: string;
} 