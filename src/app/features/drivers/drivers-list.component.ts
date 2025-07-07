import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../core/services/driver.service';
import { Driver } from '../../core/models/driver';
import { DriverFormComponent } from './driver-form.component';
//import { AssignUserComponent } from './assign-user.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drivers-list',
  standalone: true,
  imports: [CommonModule, DriverFormComponent],
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.scss']
})
export class DriversListComponent implements OnInit {
  drivers: Driver[] = [];
  loading = true;
  error = '';
  showForm = false;
  selectedDriver: Driver | null = null;
  showAssignUser = false;
  driverForUser: Driver | null = null;

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.driverService.getDrivers().subscribe({
      next: (drivers) => {
        this.drivers = drivers;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar conductores';
        this.loading = false;
      }
    });
  }

  onCreate() {
    // Lógica para crear conductor
  }

  onEdit(driver: Driver) {
    // Lógica para editar conductor
  }

  onDelete(driver: Driver) {
    const nombre = `${driver.firstName ?? ''} ${driver.lastName ?? ''}`.trim();
    if (confirm(`¿Seguro que deseas eliminar al conductor ${nombre}?`)) {
      this.driverService.deleteDriver(driver.id!).subscribe({
        next: () => this.ngOnInit(),
        error: () => alert('Error al eliminar conductor')
      });
    }
  }

  onAssignUser(driver: Driver) {
    this.driverForUser = driver;
    this.showAssignUser = true;
  }

  onAssignUserClose(refresh: boolean = false) {
    this.showAssignUser = false;
    this.driverForUser = null;
    if (refresh) {
      this.ngOnInit();
    }
  }

  onFormClose(refresh: boolean = false) {
    this.showForm = false;
    this.selectedDriver = null;
    if (refresh) {
      this.ngOnInit();
    }
  }
} 