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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { Driver } from '../../../core/models/driver.model';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  templateUrl: './driver-form.component.html',
  styleUrl: './driver-form.component.scss',
})
export class DriverFormComponent {
  driverForm: FormGroup;
  licenses = ['A', 'B', 'C', 'D', 'E'];
  machineryTypes = ['Liviana', 'Pesada', 'Especializada'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DriverFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { driver?: Driver }
  ) {
    this.driverForm = this.fb.group({
      firstName: [data.driver?.firstName || '', Validators.required],
      lastName: [data.driver?.lastName || '', Validators.required],
      dni: [data.driver?.dni || '', Validators.required],
      address: [data.driver?.address || '', Validators.required],
      phone: [data.driver?.phone || '', Validators.required],
      license: [data.driver?.license || '', Validators.required],
      machineryType: [data.driver?.machineryType || '', Validators.required],
      hourlyRate: [
        data.driver?.hourlyRate ?? 0,
        [Validators.required, Validators.min(0)],
      ],
      userId: [data.driver?.userId || '', Validators.required],
      isAvailability: [data.driver?.isAvailability ?? true],
      isActive: [data.driver?.isActive ?? true],
    });
  }

  save() {
    if (this.driverForm.valid) {
      const formValue = {
        ...this.driverForm.value,
        id: this.data.driver?.id, // para PUT
      };
      this.dialogRef.close(formValue);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
