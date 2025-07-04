import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleMaintenance } from '../models/vehicle-maintenance.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleMaintenanceService {
  private apiUrl = `${environment.vehicleApiUrl}/api/VehicleMaintenance`;

  constructor(private http: HttpClient) {}

  getAllMaintenances(): Observable<VehicleMaintenance[]> {
    return this.http.get<VehicleMaintenance[]>(this.apiUrl);
  }

  getMaintenanceById(id: string): Observable<VehicleMaintenance> {
    return this.http.get<VehicleMaintenance>(`${this.apiUrl}/${id}`);
  }

  createMaintenance(data: VehicleMaintenance): Observable<VehicleMaintenance> {
    return this.http.post<VehicleMaintenance>(this.apiUrl, data);
  }

  updateMaintenance(
    id: string,
    data: VehicleMaintenance
  ): Observable<VehicleMaintenance> {
    return this.http.put<VehicleMaintenance>(`${this.apiUrl}/${id}`, data);
  }

  deleteMaintenance(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMaintenancesByVehicle(
    vehicleId: string
  ): Observable<VehicleMaintenance[]> {
    return this.http.get<VehicleMaintenance[]>(
      `${this.apiUrl}/by-vehicle/${vehicleId}`
    );
  }

  getCompletedMaintenances(
    vehicleId: string
  ): Observable<VehicleMaintenance[]> {
    return this.http.get<VehicleMaintenance[]>(
      `${this.apiUrl}/completed/${vehicleId}`
    );
  }

  getOngoingMaintenances(): Observable<VehicleMaintenance[]> {
    return this.http.get<VehicleMaintenance[]>(`${this.apiUrl}/ongoing`);
  }
}
