import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form.component';
// import { UserRolesComponent } from './user-roles.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UserFormComponent],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  error = '';
  showForm = false;
  selectedUser: User | null = null;
  users: User[] = [];
  loading = true;
  showRoles = false;
  userForRoles: User | null = null;

  constructor(private userService: UserService) {
    console.log('Componente UsersList inicializado');
  }

  onCreate() {
    this.selectedUser = null;
    this.showForm = true;
  }

  onEdit(user: User) {
    this.selectedUser = { ...user };
    this.showForm = true;
  }

  onDelete(user: User) {
    if (confirm(`¿Seguro que deseas eliminar al usuario ${user.username}?`)) {
      this.userService.deleteUser(user.id ?? '').subscribe({
        next: () => this.ngOnInit(),
        error: () => alert('Error al eliminar usuario')
      });
    }
  }

  onAssignRoles(user: User) {
    this.userForRoles = user;
    this.showRoles = true;
  }

  onFormClose(refresh: boolean = false) {
    this.showForm = false;
    this.selectedUser = null;
    if (refresh) {
      this.ngOnInit();
    }
  }

  onRolesClose(refresh: boolean = false) {
    this.showRoles = false;
    this.userForRoles = null;
    if (refresh) {
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar usuarios';
        this.loading = false;
      }
    });
  }
} 