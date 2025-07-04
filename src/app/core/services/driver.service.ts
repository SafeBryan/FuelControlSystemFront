import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver.model';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private apiUrl = `${environment.driverApiUrl}/api/Driver`;

  constructor(private http: HttpClient) {}

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl);
  }

  getAvailableDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiUrl}/available`);
  }

  createDriver(driver: Partial<Driver>): Observable<Driver> {
    return this.http.post<Driver>(this.apiUrl, driver);
  }

  updateDriver(id: string, driver: Partial<Driver>): Observable<Driver> {
    return this.http.put<Driver>(`${this.apiUrl}/${id}`, driver);
  }

  deleteDriver(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
