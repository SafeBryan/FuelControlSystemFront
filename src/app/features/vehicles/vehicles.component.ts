import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService, Vehicle } from '../../core/services/vehicle.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { VehicleFormComponent } from '../vehicles/vehicle-form/vehicle-form.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatConfirmDialogComponent } from '../../shared/mat-confirm-dialog/mat-confirm-dialog.component';


@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
})
export class VehiclesComponent implements OnInit {
  displayedColumns: string[] = [
    'plateNumber',
    'type',
    'fuelType',
    'fuelEfficiency',
    'brand',
    'model',
    'acquisitionDate',
    'isUnderMaintenance',
    'actions',
  ];

  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  searchControl = new FormControl('');
  loading = true;

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadVehicles();

    this.searchControl.valueChanges.subscribe((value) => {
      this.filteredVehicles = this.vehicles.filter((v) =>
        `${v.plateNumber} ${v.brand} ${v.model}`
          .toLowerCase()
          .includes(value?.toLowerCase() || '')
      );
    });
  }

  loadVehicles() {
    this.loading = true;
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.filteredVehicles = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar vehículos:', err);
        this.loading = false;
      },
    });
  }

  addVehicle() {
    const dialogRef = this.dialog.open(VehicleFormComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vehicleService.createVehicle(result).subscribe({
          next: () => {
            this.snackBar.open('Vehículo agregado correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.loadVehicles();
          },
          error: () => {
            this.snackBar.open('Error al agregar vehículo', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  editVehicle(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(VehicleFormComponent, {
      width: '500px',
      data: { vehicle },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vehicleService.updateVehicle(vehicle.id, result).subscribe({
          next: () => {
            this.snackBar.open('Vehículo actualizado correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.loadVehicles();
          },
          error: () => {
            this.snackBar.open('Error al actualizar vehículo', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  deleteVehicle(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Estás seguro de eliminar el vehículo ${vehicle.plateNumber}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vehicleService.deleteVehicle(vehicle.id).subscribe({
          next: () => {
            this.snackBar.open('Vehículo eliminado correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.loadVehicles();
          },
          error: () => {
            this.snackBar.open('Error al eliminar vehículo', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
