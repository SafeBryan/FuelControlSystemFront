import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleMaintenanceService } from '../../../core/services/vehicle-maintenance.service';
import { VehicleMaintenance } from '../../../core/models/vehicle-maintenance.model';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatConfirmDialogComponent } from '../../../shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { VehicleMaintenanceFormComponent } from '../vehicle-maintenance-form/vehicle-maintenance-form.component';

@Component({
  selector: 'app-vehicle-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './vehicle-maintenance.component.html',
  styleUrl: './vehicle-maintenance.component.scss',
})
export class VehicleMaintenanceComponent implements OnInit {
  displayedColumns: string[] = [
    'vehicleId',
    'description',
    'serviceProvider',
    'startDate',
    'endDate',
    'cost',
    'status',
    'actions',
  ];

  maintenances: VehicleMaintenance[] = [];
  filteredMaintenances: VehicleMaintenance[] = [];
  searchControl = new FormControl('');
  loading = true;

  constructor(
    private maintenanceService: VehicleMaintenanceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadMaintenances();

    this.searchControl.valueChanges.subscribe((value) => {
      const lower = (value || '').toLowerCase();
      this.filteredMaintenances = this.maintenances.filter((m) =>
        `${m.description} ${m.serviceProvider ?? ''} ${
          m.isCompleted ? 'Completado' : 'En curso'
        }`
          .toLowerCase()
          .includes(lower)
      );
    });
  }

  loadMaintenances() {
    this.loading = true;
    this.maintenanceService.getAllMaintenances().subscribe({
      next: (data) => {
        this.maintenances = data;
        this.filteredMaintenances = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar mantenimientos:', err);
        this.loading = false;
      },
    });
  }

  addMaintenance() {
    const dialogRef = this.dialog.open(VehicleMaintenanceFormComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.maintenanceService.createMaintenance(result).subscribe({
          next: () => {
            this.snackBar.open('Mantenimiento creado', 'Cerrar', {
              duration: 3000,
            });
            this.loadMaintenances();
          },
          error: () => {
            this.snackBar.open('Error al crear', 'Cerrar', { duration: 3000 });
          },
        });
      }
    });
  }

  editMaintenance(maintenance: VehicleMaintenance) {
    const dialogRef = this.dialog.open(VehicleMaintenanceFormComponent, {
      width: '500px',
      data: { maintenance },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.maintenanceService
          .updateMaintenance(maintenance.id!, result)
          .subscribe({
            next: () => {
              this.snackBar.open('Mantenimiento actualizado', 'Cerrar', {
                duration: 3000,
              });
              this.loadMaintenances();
            },
            error: () => {
              this.snackBar.open('Error al actualizar', 'Cerrar', {
                duration: 3000,
              });
            },
          });
      }
    });
  }

  deleteMaintenance(maintenance: VehicleMaintenance) {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Deseas eliminar el mantenimiento: ${maintenance.description}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.maintenanceService.deleteMaintenance(maintenance.id!).subscribe({
          next: () => {
            this.snackBar.open('Mantenimiento eliminado', 'Cerrar', {
              duration: 3000,
            });
            this.loadMaintenances();
          },
          error: () => {
            this.snackBar.open('Error al eliminar', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
