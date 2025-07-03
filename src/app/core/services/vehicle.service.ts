import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface Vehicle {
  id: string;
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
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = `${environment.vehicleApiUrl}/api/Vehicle`;

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  createVehicle(vehicle: Partial<Vehicle>) {
    return this.http.post<Vehicle>(this.apiUrl, vehicle);
  }

  updateVehicle(id: string, vehicle: Partial<Vehicle>) {
    return this.http.put<Vehicle>(`${this.apiUrl}/${id}`, vehicle);
  }

  deleteVehicle(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
