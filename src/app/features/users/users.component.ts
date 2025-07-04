import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserFormComponent } from '../users/user-form/user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  displayedColumns: string[] = ['username', 'email', 'roles', 'actions'];
  searchControl = new FormControl('');

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.searchControl.valueChanges.subscribe((value) => {
      const lower = (value || '').toLowerCase();
      this.filteredUsers = this.users.filter((u) =>
        `${u.username} ${u.email}`.toLowerCase().includes(lower)
      );
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
      },
      error: () => {
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  addUser() {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.createUser(result).subscribe({
          next: () => {
            this.snackBar.open('Usuario creado', 'Cerrar', { duration: 3000 });
            this.loadUsers();
          },
          error: () => {
            this.snackBar.open('Error al crear usuario', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: { user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateUser(user.id!, result).subscribe({
          next: () => {
            this.snackBar.open('Usuario actualizado', 'Cerrar', {
              duration: 3000,
            });
            this.loadUsers();
          },
          error: () => {
            this.snackBar.open('Error al actualizar usuario', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  deleteUser(user: User) {
    if (confirm(`¿Deseas eliminar a ${user.username}?`)) {
      this.userService.deleteUser(user.id!).subscribe({
        next: () => {
          this.snackBar.open('Usuario eliminado', 'Cerrar', { duration: 3000 });
          this.loadUsers();
        },
        error: () => {
          this.snackBar.open('Error al eliminar usuario', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }
}
