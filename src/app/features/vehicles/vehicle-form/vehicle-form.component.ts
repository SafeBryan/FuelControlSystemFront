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
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Vehicle } from '../../../core/services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.scss',
})
export class VehicleFormComponent {
  vehicleForm: FormGroup;

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
        data.vehicle?.fuelEfficiency || '',
        [Validators.required, Validators.min(0)],
      ],
      brand: [data.vehicle?.brand || '', Validators.required],
      model: [data.vehicle?.model || '', Validators.required],
      acquisitionDate: [
        data.vehicle?.acquisitionDate || '',
        Validators.required,
      ],
      purchasePrice: [
        data.vehicle?.purchasePrice || '',
        [Validators.required, Validators.min(0)],
      ],
      documentNumber: [data.vehicle?.documentNumber || '', Validators.required],
    });
  }

  save() {
    if (this.vehicleForm.invalid) return;
    this.dialogRef.close(this.vehicleForm.value);
  }

  cancel() {
    this.dialogRef.close();
  }
}
