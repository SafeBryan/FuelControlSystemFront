import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../core/services/route.service';
import { Route } from '../../core/models/route';
import { RouteFormComponent } from './route-form.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-routes-list',
  standalone: true,
  imports: [CommonModule, RouteFormComponent],
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {
  routes: Route[] = [];
  loading = true;
  error = '';
  showForm = false;
  selectedRoute: Route | null = null;

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {
    this.routeService.getRoutes().subscribe({
      next: (routes) => {
        this.routes = routes;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar rutas';
        this.loading = false;
      }
    });
  }

  onCreate() {
    this.selectedRoute = null;
    this.showForm = true;
  }

  onEdit(route: Route) {
    this.selectedRoute = { ...route };
    this.showForm = true;
  }

  onFormSave(route: Route) {
    if (route.id) {
      // Editar
      this.routeService.updateRoute(route.id, route).subscribe({
        next: () => this.refresh(),
        error: () => alert('Error al actualizar ruta')
      });
    } else {
      // Crear
      this.routeService.createRoute(route).subscribe({
        next: () => this.refresh(),
        error: () => alert('Error al crear ruta')
      });
    }
    this.showForm = false;
    this.selectedRoute = null;
  }

  onFormCancel() {
    this.showForm = false;
    this.selectedRoute = null;
  }

  onDelete(route: Route) {
    if (confirm(`¿Seguro que deseas eliminar la ruta ${route.name}?`)) {
      this.routeService.deleteRoute(route.id).subscribe({
        next: () => this.refresh(),
        error: () => alert('Error al eliminar ruta')
      });
    }
  }

  private refresh() {
    this.loading = true;
    this.routeService.getRoutes().subscribe({
      next: (routes) => {
        this.routes = routes;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar rutas';
        this.loading = false;
      }
    });
  }
} 