import { Component, EventEmitter, Input } from '@angular/core';
import { ModalBaseComponent } from '../../../../shared/components/modal-base/modal-base.component';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-edit-user-modal',
  imports: [ModalBaseComponent],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css',
})
export class EditUserModalComponent extends ModalBaseComponent {
  @Input() user!: User;

  ngOnInit() {
    this.inputs = [
      { name: 'name', type: 'text', label: 'Name', value: this.user.name },
      { name: 'email', type: 'email', label: 'Email', value: this.user.email },
      { name: 'password', type: 'password', label: 'Password', value: '' },
    ];
  }

  handleSubmit() {
    const updatedUser = this.inputs.reduce(
      (acc: { [key: string]: any }, input) => {
        acc[input.name] = input.value;
        return acc;
      },
      {}
    );

    this.http
      .put<User>(`http://localhost:8000/users/${this.user.id}`, updatedUser)
      .subscribe((user: User) => {
        this.onSubmit.emit(user);
      });
  }
}
