import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/models/user.model';
import { UserRole, USER_ROLE_LABELS } from '../../../core/enums/user-role.enum';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;
  roles = Object.values(UserRole).filter(
    (value) => typeof value === 'number'
  ) as number[];
  roleLabels = USER_ROLE_LABELS;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: User }
  ) {
    this.userForm = this.fb.group({
      username: [data.user?.username || '', Validators.required],
      email: [data.user?.email || '', [Validators.required, Validators.email]],
      password: [
        '',
        data.user ? [] : [Validators.required, Validators.minLength(6)],
      ], // requerido solo al crear
      roles: this.fb.array(
        this.roles.map((role) => data.user?.roles?.includes(role) || false)
      ),
    });
  }

  get rolesArray(): FormArray {
    return this.userForm.get('roles') as FormArray;
  }

  toggleRole(index: number) {
    const current = this.rolesArray.at(index).value;
    this.rolesArray.at(index).setValue(!current);
  }

  save() {
    if (this.userForm.valid) {
      const selectedRoles = this.roles.filter(
        (_, i) => this.rolesArray.at(i).value
      );

      const userPayload: Partial<User> = {
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        roles: selectedRoles,
      };

      if (!this.data.user) {
        userPayload.password = this.userForm.value.password;
      }

      console.log('🟩 Payload enviado:', userPayload);
      this.dialogRef.close(userPayload);
    } else {
      console.log('❌ Formulario inválido:', this.userForm.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
