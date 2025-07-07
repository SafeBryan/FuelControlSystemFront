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
        canActivate: [authGuard],
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/users-list.component').then(
            (m) => m.UsersListComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'drivers',
        loadComponent: () =>
          import('./features/drivers/drivers-list.component').then(
            (m) => m.DriversListComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'routes',
        loadComponent: () =>
          import('./features/routes/routes-list.component').then(
            (m) => m.RoutesListComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'trips',
        loadComponent: () =>
          import('./features/trips/trips-list.component').then(
            (m) => m.TripsListComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('./features/reports/reports-list.component').then(
            (m) => m.ReportsListComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'fuel',
        loadComponent: () =>
          import('./features/fuel/fuel.component').then(
            (m) => m.FuelComponent
          ),
        canActivate: [authGuard],
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
