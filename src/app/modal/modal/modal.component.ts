import { Component, OnInit } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { OtherComponent } from '../other/other.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  public closeResult = '';

  constructor() {}

  ngOnInit() {}

  // public open() {
  //   const options: NgbModalOptions = {
  //     size: 'xl',
  //   };
  //   this.modalService.open(OtherComponent, options).then(
  //     (result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //       console.log(this.closeResult, result);
  //     },
  //     (reason) => {
  //       this.closeResult = `Dismissed ${this.modalService.getDismissReason(
  //         reason
  //       )}`;
  //       console.log(this.closeResult, reason);
  //     }
  //   );
  // }
}
