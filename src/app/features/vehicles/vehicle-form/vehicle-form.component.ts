import { Component, Inject } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../core/services/vehicle.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
})
export class VehicleFormComponent {
  vehicleForm: FormGroup;

  vehicleTypes = ['Liviana', 'Pesada', 'Otro'];
  fuelTypes = ['Gasoline', 'Diesel', 'Electric'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehicleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicle?: Vehicle }
  ) {
    this.vehicleForm = this.fb.group({
      plateNumber: [data.vehicle?.plateNumber || '', Validators.required],
      type: [data.vehicle?.type || '', Validators.required],
      fuelType: [data.vehicle?.fuelType || '', Validators.required],
      fuelEfficiency: [
        data.vehicle?.fuelEfficiency ?? 0,
        [Validators.required, Validators.min(0)],
      ],
      averageFuelEfficiency: [
        data.vehicle?.averageFuelEfficiency ?? 0,
        [Validators.required, Validators.min(0)],
      ],
      brand: [data.vehicle?.brand || '', Validators.required],
      model: [data.vehicle?.model || '', Validators.required],
      acquisitionDate: [
        data.vehicle ? new Date(data.vehicle.acquisitionDate) : '',
        Validators.required,
      ],
      purchasePrice: [
        data.vehicle?.purchasePrice ?? 0,
        [Validators.required, Validators.min(0)],
      ],
      documentNumber: [data.vehicle?.documentNumber || '', Validators.required],
      isUnderMaintenance: [data.vehicle?.isUnderMaintenance || false],
    });
  }

  save() {
    if (this.vehicleForm.valid) {
      const formValue = {
        id: this.data.vehicle?.id ?? undefined,
        ...this.vehicleForm.value,
        acquisitionDate: this.vehicleForm.value.acquisitionDate.toISOString(),
      };
      this.dialogRef.close(formValue);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
