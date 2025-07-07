import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleMaintenance } from '../models/vehicle-maintenance';

@Injectable({ providedIn: 'root' })
export class VehicleMaintenanceService {
  private apiUrl = 'http://localhost:7205/api/vehiclemaintenance';

  constructor(private http: HttpClient) {}

  getMaintenances(): Observable<VehicleMaintenance[]> {
    return this.http.get<VehicleMaintenance[]>(this.apiUrl);
  }

  getMaintenance(id: string): Observable<VehicleMaintenance> {
    return this.http.get<VehicleMaintenance>(`${this.apiUrl}/${id}`);
  }

  getByVehicle(vehicleId: string): Observable<VehicleMaintenance[]> {
    return this.http.get<VehicleMaintenance[]>(`${this.apiUrl}/by-vehicle/${vehicleId}`);
  }

  createMaintenance(maintenance: VehicleMaintenance): Observable<VehicleMaintenance> {
    return this.http.post<VehicleMaintenance>(this.apiUrl, maintenance);
  }

  updateMaintenance(id: string, maintenance: VehicleMaintenance): Observable<VehicleMaintenance> {
    return this.http.put<VehicleMaintenance>(`${this.apiUrl}/${id}`, maintenance);
  }

  deleteMaintenance(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 