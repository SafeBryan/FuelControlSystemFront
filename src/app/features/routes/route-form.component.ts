import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Route } from '../../core/models/route';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss']
})
export class RouteFormComponent implements OnInit {
  @Input() route: Route | null = null;
  @Output() save = new EventEmitter<Route>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      distance: [0, [Validators.required, Validators.min(0)]],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    if (this.route) {
      this.form.patchValue(this.route);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const data: Route = {
      ...this.form.value,
      id: this.route?.id || ''
    };
    this.save.emit(data);
  }

  onCancel() {
    this.cancel.emit();
  }
} 