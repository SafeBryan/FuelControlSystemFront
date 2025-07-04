import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { VehicleMaintenance } from '../../../core/models/vehicle-maintenance.model';
import { MatSelectModule } from '@angular/material/select';
import {
  VehicleService,
  Vehicle,
} from '../../../core/services/vehicle.service';

@Component({
  selector: 'app-vehicle-maintenance-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './vehicle-maintenance-form.component.html',
  styleUrl: './vehicle-maintenance-form.component.scss',
})
export class VehicleMaintenanceFormComponent implements OnInit {
  maintenanceForm: FormGroup;
  statuses = ['En curso', 'Completado'];
  vehicles: Vehicle[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehicleMaintenanceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { maintenance?: VehicleMaintenance },
    private vehicleService: VehicleService
  ) {
    this.maintenanceForm = this.fb.group({
      vehicleId: [data.maintenance?.vehicleId || '', Validators.required],
      description: [data.maintenance?.description || '', Validators.required],
      startDate: [
        data.maintenance ? new Date(data.maintenance.startDate) : '',
        Validators.required,
      ],
      endDate: [
        data.maintenance?.endDate ? new Date(data.maintenance.endDate) : '',
      ],
      cost: [
        data.maintenance?.cost ?? 0,
        [Validators.required, Validators.min(0)],
      ],
      status: [
        data.maintenance?.isCompleted ? 'Completado' : 'En curso',
        Validators.required,
      ],
      serviceProvider: [data.maintenance?.serviceProvider || ''],
    });
  }

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => (this.vehicles = vehicles),
      error: (err) => console.error('Error cargando vehículos:', err),
    });
  }

  save() {
    if (this.maintenanceForm.valid) {
      const formValue = {
        id: this.data.maintenance?.id, // necesario en PUT
        vehicleId: this.maintenanceForm.value.vehicleId,
        description: this.maintenanceForm.value.description,
        startDate: this.maintenanceForm.value.startDate.toISOString(),
        endDate: this.maintenanceForm.value.endDate
          ? this.maintenanceForm.value.endDate.toISOString()
          : null,
        cost: this.maintenanceForm.value.cost,
        isCompleted: this.maintenanceForm.value.status === 'Completado',
        serviceProvider: this.maintenanceForm.value.serviceProvider ?? '',
      };

      console.log('🟩 Enviando formulario:', formValue); 

      this.dialogRef.close(formValue);
    } else {
      console.log('❌ Formulario inválido', this.maintenanceForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
