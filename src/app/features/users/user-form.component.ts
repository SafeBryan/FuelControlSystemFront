import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() user: User | null = null;
  @Output() close = new EventEmitter<boolean>();

  form: FormGroup;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      roles: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.form.patchValue({
        username: this.user.username,
        email: this.user.email,
        roles: this.user.roles || [],
        password: '' // No se puede recuperar la contraseña, se deja vacío
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    const data = { ...this.form.value };
    if (this.user) {
      // Editar usuario: enviar los campos que espera el backend
      const updateData: any = {
        username: data.username,
        email: data.email,
        roles: data.roles
      };
      if (this.user.refreshToken) {
        updateData.refreshToken = this.user.refreshToken;
      }
      if (this.user.refreshTokenExpiryTime) {
        updateData.refreshTokenExpiryTime = this.user.refreshTokenExpiryTime;
      }
      this.userService.updateUser(this.user.id ?? '', updateData).subscribe({
        next: () => this.close.emit(true),
        error: () => {
          this.error = 'Error al actualizar usuario';
          this.loading = false;
        }
      });
    } else {
      // Crear usuario
      this.userService.createUser(data).subscribe({
        next: () => this.close.emit(true),
        error: () => {
          this.error = 'Error al crear usuario';
          this.loading = false;
        }
      });
    }
  }

  onCancel() {
    this.close.emit(false);
  }
} 