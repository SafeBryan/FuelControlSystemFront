import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route } from '../models/route';

@Injectable({ providedIn: 'root' })
export class RouteService {
  private apiUrl = 'http://localhost:7224/api/route';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getRoute(id: string): Observable<Route> {
    return this.http.get<Route>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createRoute(route: Route): Observable<Route> {
    return this.http.post<Route>(this.apiUrl, route, {
      headers: this.getAuthHeaders()
    });
  }

  updateRoute(id: string, route: Route): Observable<Route> {
    return this.http.put<Route>(`${this.apiUrl}/${id}`, route, {
      headers: this.getAuthHeaders()
    });
  }

  deleteRoute(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
} 