export interface VehicleMaintenance {
  id: string;
  vehicleId: string;
  startDate: string;
  endDate: string | null;
  description: string;
  cost: number;
  isCompleted: boolean;
  serviceProvider: string;
}
