import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Trip } from '../../core/models/trip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnInit {
  @Input() trip: Trip | null = null;
  @Output() save = new EventEmitter<Trip>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      vehicleId: ['', Validators.required],
      driverId: ['', Validators.required],
      routeId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      fuelConsumed: [0, [Validators.required, Validators.min(0)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    if (this.trip) {
      this.form.patchValue(this.trip);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const data: Trip = {
      ...this.form.value,
      id: this.trip?.id || ''
    };
    this.save.emit(data);
  }

  onCancel() {
    this.cancel.emit();
  }
} 