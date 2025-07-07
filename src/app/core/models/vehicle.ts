export interface Vehicle {
  id?: string;
  plateNumber: string;
  type: string;
  fuelType: string;
  fuelEfficiency: number;
  averageFuelEfficiency: number;
  brand: string;
  model: string;
  acquisitionDate: string;
  purchasePrice: number;
  documentNumber: string;
  isUnderMaintenance: boolean;
  averageSpeedKmPerHour: number;
} 