import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { showLoader } from '../../../core/utils/global-function';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class ModalBaseComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() inputs!: Array<{
    label: string;
    type: string;
    name: string;
    value?: string;
  }>;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(protected http: HttpClient) {}

  submit() {
    const formData = this.inputs.reduce((acc, input) => {
      acc[input.name] = input.value || '';
      return acc;
    }, {} as { [key: string]: string });

    this.onSubmit.emit(formData);
    this.closeModal();
    showLoader();
  }

  closeModal() {
    const modalElement = document.getElementById(this.id)?.querySelector(`[data-bs-dismiss="modal"]`);

    if (modalElement) {
      (modalElement as HTMLElement).click();
    }
  }
}
