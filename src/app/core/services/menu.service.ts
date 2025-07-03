import { Injectable } from '@angular/core';

export interface IMenu {
  title: string;
  url?: string;
  icon: string;
  children?: IMenu[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private adminMenu: IMenu[] = [
    { title: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
    { title: 'Vehículos', url: '/vehicles', icon: 'local_shipping' },
    { title: 'Conductores', url: '/drivers', icon: 'person' },
    { title: 'Rutas', url: '/routes', icon: 'alt_route' },
    {
      title: 'Consumo de Combustible',
      url: '/fuel',
      icon: 'local_gas_station',
    },
    {
      title: 'Reportes',
      icon: 'bar_chart',
      children: [
        {
          title: 'Consumo General',
          url: '/reports/fuel-consumption',
          icon: 'show_chart',
        },
        {
          title: 'Vehículos Activos',
          url: '/reports/active-vehicles',
          icon: 'directions_car',
        },
      ],
    },
  ];

  private supervisorMenu: IMenu[] = [
    { title: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
    { title: 'Vehículos', url: '/vehicles', icon: 'local_shipping' },
    { title: 'Rutas', url: '/routes', icon: 'alt_route' },
    { title: 'Combustible', url: '/fuel', icon: 'alt_route' },
    { title: 'Reportes', url: '/reports', icon: 'bar_chart' },
  ];

  private operadorMenu: IMenu[] = [
    { title: 'Dashboard', url: '/dashboard', icon: 'dashboard' },
    {
      title: 'Consumo de Combustible',
      url: '/fuel',
      icon: 'local_gas_station',
    },
    { title: 'Rutas', url: '/routes', icon: 'alt_route' },
  ];

  getMenuByRol(rol: string): IMenu[] {
    switch (rol.toUpperCase()) {
      case 'ADMIN':
        return JSON.parse(JSON.stringify(this.adminMenu));
      case 'SUPERVISOR':
        return JSON.parse(JSON.stringify(this.supervisorMenu));
      case 'OPERADOR':
        return JSON.parse(JSON.stringify(this.operadorMenu));
      default:
        return [{ title: 'Dashboard', url: '/dashboard', icon: 'dashboard' }];
    }
  }
}
