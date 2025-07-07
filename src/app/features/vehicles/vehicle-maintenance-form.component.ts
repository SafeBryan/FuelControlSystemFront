import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VehicleMaintenance } from '../../core/models/vehicle-maintenance';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-maintenance-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vehicle-maintenance-form.component.html',
  styleUrls: ['./vehicle-maintenance-form.component.scss']
})
export class VehicleMaintenanceFormComponent implements OnInit {
  @Input() maintenance: VehicleMaintenance | null = null;
  @Input() vehicleId: string = '';
  @Output() save = new EventEmitter<VehicleMaintenance>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      completed: [false]
    });
  }

  ngOnInit(): void {
    if (this.maintenance) {
      this.form.patchValue(this.maintenance);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const data: VehicleMaintenance = {
      ...this.form.value,
      vehicleId: this.vehicleId,
      id: this.maintenance?.id || ''
    };
    this.save.emit(data);
  }

  onCancel() {
    this.cancel.emit();
  }
} 