export interface Driver {
  id?: string;
  firstName: string;
  lastName: string;
  dni: string;
  address: string;
  phone: string;
  isAvailability: boolean;
  isActive: boolean;
  license: 'A' | 'B' | 'C' | 'E';
  machineryType: 'Liviana' | 'Pesada' | 'Otra';
  hourlyRate: number;
  userId: string;
}
