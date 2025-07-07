import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Driver } from '../../core/models/driver';
import { DriverService } from '../../core/services/driver.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.scss']
})
export class DriverFormComponent implements OnInit {
  @Input() driver: Driver | null = null;
  @Output() close = new EventEmitter<boolean>();

  form: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private driverService: DriverService) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      license: ['', Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    if (this.driver) {
      this.form.patchValue({
        firstName: this.driver.firstName,
        lastName: this.driver.lastName,
        license: this.driver.license,
        isActive: this.driver.isActive
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const data = { ...this.form.value };
    if (this.driver && this.driver.id) {
      // Editar conductor
      this.driverService.updateDriver(this.driver.id, data).subscribe({
        next: () => this.close.emit(true),
        error: () => {
          this.error = 'Error al actualizar conductor';
          this.loading = false;
        }
      });
    } else if (!this.driver) {
      // Crear conductor
      this.driverService.createDriver(data).subscribe({
        next: () => this.close.emit(true),
        error: () => {
          this.error = 'Error al crear conductor';
          this.loading = false;
        }
      });
    } else {
      this.error = 'ID de conductor no válido';
      this.loading = false;
    }
  }

  onCancel() {
    this.close.emit(false);
  }
} 