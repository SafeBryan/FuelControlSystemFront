import { Component, Input, OnInit, Inject } from '@angular/core';
import { VehicleMaintenanceService } from '../../core/services/vehicle-maintenance.service';
import { VehicleMaintenance } from '../../core/models/vehicle-maintenance';
import { VehicleMaintenanceFormComponent } from './vehicle-maintenance-form.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-maintenance-list',
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe, VehicleMaintenanceFormComponent],
  templateUrl: './vehicle-maintenance-list.component.html',
  styleUrls: ['./vehicle-maintenance-list.component.scss']
})
export class VehicleMaintenanceListComponent implements OnInit {
  @Input() vehicleId!: string;
  maintenances: VehicleMaintenance[] = [];
  loading = true;
  error = '';
  showForm = false;
  selectedMaintenance: VehicleMaintenance | null = null;

  constructor(
    private maintenanceService: VehicleMaintenanceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.vehicleId) {
      this.vehicleId = data.vehicleId;
    }
  }

  ngOnInit(): void {
    if (this.vehicleId) {
      this.maintenanceService.getByVehicle(this.vehicleId).subscribe({
        next: (data) => {
          this.maintenances = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar mantenimientos';
          this.loading = false;
        }
      });
    }
  }

  onCreate() {
    this.selectedMaintenance = null;
    this.showForm = true;
  }

  onEdit(m: VehicleMaintenance) {
    this.selectedMaintenance = { ...m };
    this.showForm = true;
  }

  onFormSave(maintenance: VehicleMaintenance) {
    if (maintenance.id) {
      // Editar
      this.maintenanceService.updateMaintenance(maintenance.id, maintenance).subscribe({
        next: () => this.refresh(),
        error: () => alert('Error al actualizar mantenimiento')
      });
    } else {
      // Crear
      this.maintenanceService.createMaintenance(maintenance).subscribe({
        next: () => this.refresh(),
        error: () => alert('Error al crear mantenimiento')
      });
    }
    this.showForm = false;
    this.selectedMaintenance = null;
  }

  onFormCancel() {
    this.showForm = false;
    this.selectedMaintenance = null;
  }

  onDelete(m: VehicleMaintenance) {
    if (confirm(`¿Seguro que deseas eliminar este mantenimiento?`)) {
      this.maintenanceService.deleteMaintenance(m.id).subscribe({
        next: () => this.refresh(),
        error: () => alert('Error al eliminar mantenimiento')
      });
    }
  }

  private refresh() {
    this.loading = true;
    this.maintenanceService.getByVehicle(this.vehicleId).subscribe({
      next: (data) => {
        this.maintenances = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar mantenimientos';
        this.loading = false;
      }
    });
  }
} 