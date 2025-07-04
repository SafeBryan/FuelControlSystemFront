import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'vehicles',
        loadComponent: () =>
          import('./features/vehicles/vehicles.component').then(
            (m) => m.VehiclesComponent
          ),
      },
      {
        path: 'vehicle-maintenance',
        loadComponent: () =>
          import(
            './features/vehicles/vehicle-maintenance/vehicle-maintenance.component'
          ).then((m) => m.VehicleMaintenanceComponent),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  { path: '**', redirectTo: 'login' },
];
