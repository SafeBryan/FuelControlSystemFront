export interface Driver {
  id?: string;
  firstName: string;
  lastName: string;
  dni: string;
  address: string;
  phone: string;
  isAvailability: boolean;
  isActive: boolean;
  license: string;
  machineryType: string;
  hourlyRate: number;
  userId: string;
} 