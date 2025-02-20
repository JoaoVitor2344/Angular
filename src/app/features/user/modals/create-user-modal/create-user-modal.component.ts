import { Component, EventEmitter } from '@angular/core';
import { ModalBaseComponent } from '../../../../shared/components/modal-base/modal-base.component';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-create-user-modal',
  imports: [ModalBaseComponent],
  templateUrl: './create-user-modal.component.html',
  styleUrl: './create-user-modal.component.css',
})
export class CreateUserModalComponent extends ModalBaseComponent {
  override inputs = [
    { label: 'Name', name: 'name', type: 'text', value: '' },
    { label: 'Email', name: 'email', type: 'email', value: '' },
    { label: 'Password', name: 'password', type: 'password', value: '' },
  ];

  handleSubmit($event: EventEmitter<any>) {
    this.http.post<User>('http://localhost:8000/users', $event).subscribe((user: User) => {
      this.onSubmit.emit(user);
      this.inputs.forEach((input) => (input.value = ''));
    });
  }
}
