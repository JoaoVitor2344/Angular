import { Component, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user.model';
import Swal from 'sweetalert2';
import { CreateUserModalComponent } from './modals/create-user-modal/create-user-modal.component';
import { EditUserModalComponent } from './modals/edit-user-modal/edit-user-modal.component';
import { AuthService } from '../../core/services/auth.service';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [CommonModule, CreateUserModalComponent, EditUserModalComponent],
  standalone: true,
})
export class UserComponent implements OnInit {
  users: User[] = [];
  authUser: User;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    protected loaderService: LoaderService
  ) {
    this.authUser = this.authService.getUserInfo();
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loaderService.show();
    this.http.get<User[]>('http://localhost:8000/users').subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.loaderService.hide();
      },
      error: (error) => {
        console.error('Erro ao buscar usuários:', error);
        this.loaderService.hide();
      },
    });
  }

  onUserCreated($event: User): void {
    this.users.push($event);
    this.loaderService.hide();
  }

  onUserUpdated($event: User): void {
    const index = this.users.findIndex((u) => u.id === $event.id);
    this.users[index] = $event;
    this.loaderService.hide();
  }

  deleteUser(user: User) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não poderá ser revertida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Deletar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loaderService.show();

        this.http.delete(`http://localhost:8000/users/${user.id}`).subscribe({
          next: () => {
            this.users = this.users.filter((u) => u.id !== user.id);
            this.loaderService.hide();
          },
        });
      }
    });
  }
}
