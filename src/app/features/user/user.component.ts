import { Component, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user.model';
import Swal from 'sweetalert2';
import { Loader } from '../../shared/components/loader/loader.component';
import { CreateUserModalComponent } from './modals/create-user-modal/create-user-modal.component';
import { hideLoader, showLoader } from '../../core/utils/global-function';
import { EditUserModalComponent } from './modals/edit-user-modal/edit-user-modal.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [
    CommonModule,
    Loader,
    CreateUserModalComponent,
    EditUserModalComponent,
  ],
  standalone: true,
})
export class UserComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = false;
  authUser: User;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authUser = this.authService.getUserInfo();
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.http.get<User[]>('http://localhost:8000/users').subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao buscar usuários:', error);
        this.isLoading = false;
      },
    });
  }

  onUserCreated($event: User): void {
    this.users.push($event);
    hideLoader();
  }

  onUserUpdated($event: User): void {
    const index = this.users.findIndex((u) => u.id === $event.id);
    this.users[index] = $event;
    hideLoader();
  }

  deleteUser(user: User) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação podera ser revertida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Deletar',
    }).then((result) => {
      if (result.isConfirmed) {
        showLoader();

        this.http.delete(`http://localhost:8000/users/${user.id}`).subscribe({
          next: () => {
            this.users = this.users.filter((u) => u.id !== user.id);
            hideLoader();
          },
        });
      }
    });
  }
}
