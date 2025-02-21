import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../../core/services/loader.service';

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

  constructor(
    protected http: HttpClient,
    private loaderService: LoaderService
  ) {}

  submit() {
    const formData = this.inputs.reduce((acc, input) => {
      acc[input.name] = input.value || '';
      return acc;
    }, {} as { [key: string]: string });

    this.onSubmit.emit(formData);
    this.closeModal();
    this.loaderService.show();
  }

  closeModal() {
    const modalElement = document
      .getElementById(this.id)
      ?.querySelector(`[data-bs-dismiss="modal"]`);

    if (modalElement) {
      (modalElement as HTMLElement).click();
    }
  }
}
