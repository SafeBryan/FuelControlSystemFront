import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatConfirmDialogComponent } from '../../shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { DriverService } from '../../core/services/driver.service';
import { Driver } from '../../core/models/driver.model';
import { DriverFormComponent } from '../drivers/driver-form/driver-form.component';

@Component({
  selector: 'app-drivers',
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
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss',
})
export class DriversComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dni',
    'phone',
    'license',
    'machineryType',
    'isAvailability',
    'isActive',
    'actions',
  ];

  drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];
  searchControl = new FormControl('');
  loading = true;

  constructor(
    private driverService: DriverService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDrivers();

    this.searchControl.valueChanges.subscribe((value) => {
      const lower = (value || '').toLowerCase();
      this.filteredDrivers = this.drivers.filter((d) =>
        `${d.firstName} ${d.lastName} ${d.dni}`.toLowerCase().includes(lower)
      );
    });
  }

  loadDrivers() {
    this.loading = true;
    this.driverService.getDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
        this.filteredDrivers = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar conductores:', err);
        this.loading = false;
      },
    });
  }

  addDriver() {
    const dialogRef = this.dialog.open(DriverFormComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.driverService.createDriver(result).subscribe({
          next: () => {
            this.snackBar.open('Conductor creado', 'Cerrar', {
              duration: 3000,
            });
            this.loadDrivers();
          },
          error: () => {
            this.snackBar.open('Error al crear', 'Cerrar', { duration: 3000 });
          },
        });
      }
    });
  }

  editDriver(driver: Driver) {
    const dialogRef = this.dialog.open(DriverFormComponent, {
      width: '500px',
      data: { driver },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.driverService.updateDriver(driver.id!, result).subscribe({
          next: () => {
            this.snackBar.open('Conductor actualizado', 'Cerrar', {
              duration: 3000,
            });
            this.loadDrivers();
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

  deleteDriver(driver: Driver) {
    const dialogRef = this.dialog.open(MatConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Confirmar eliminación',
        message: `¿Deseas eliminar al conductor: ${driver.firstName} ${driver.lastName}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.driverService.deleteDriver(driver.id!).subscribe({
          next: () => {
            this.snackBar.open('Conductor eliminado', 'Cerrar', {
              duration: 3000,
            });
            this.loadDrivers();
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
