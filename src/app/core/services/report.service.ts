import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FuelConsumptionReport } from '../models/report';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = 'http://localhost:7214/api/reports';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getFuelConsumptionReports(routeId: string): Observable<FuelConsumptionReport[]> {
    return this.http.get<FuelConsumptionReport[]>(`${this.apiUrl}/fuel-consumption/${routeId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getTripAudit(tripId: string): Observable<FuelConsumptionReport> {
    return this.http.get<FuelConsumptionReport>(`${this.apiUrl}/${tripId}`);
  }
} 