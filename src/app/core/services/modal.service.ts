import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalConfig } from '../interfaces/modal.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalConfig = new BehaviorSubject<ModalConfig | null>(null);
  modalConfig$ = this.modalConfig.asObservable();

  setConfig(config: ModalConfig): void {
    this.modalConfig.next(config);
  }
}