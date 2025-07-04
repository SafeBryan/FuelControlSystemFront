export enum UserRole {
  Admin = 0,
  Supervisor = 1,
  Operador = 2,
}

export const USER_ROLE_LABELS: Record<number, string> = {
  [UserRole.Admin]: 'Admin',
  [UserRole.Supervisor]: 'Supervisor',
  [UserRole.Operador]: 'Operador',
};
