export interface FuelConsumptionReport {
  tripId: string;
  vehicleId: string;
  driverId: string;
  routeId: string;
  startDate: string;
  endDate: string;
  fuelConsumed: number;
  distance: number;
  efficiency: number;
} 