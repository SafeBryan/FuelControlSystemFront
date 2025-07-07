export interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  routeId: string;
  startDate: string;
  endDate: string;
  status: string;
  fuelConsumed: number;
  notes?: string;
} 