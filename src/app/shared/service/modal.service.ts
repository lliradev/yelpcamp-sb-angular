import { Injectable } from '@angular/core';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public modal = false;

  constructor(private modalService: NgbModal) {}

  public openModal() {
    this.modal = true;
  }

  public closeModal() {
    this.modal = false;
  }

  public open(content: any, options?: NgbModalOptions): Promise<any> {
    return this.modalService.open(content, options).result;
  }

  public getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  get getModal(): boolean {
    return this.modal;
  }
}
