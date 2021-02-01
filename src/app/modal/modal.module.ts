import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ModalRoutingModule } from './modal.routing';
import { ModalComponent } from './modal/modal.component';
import { OtherComponent } from './other/other.component';

@NgModule({
  declarations: [ModalComponent, OtherComponent],
  imports: [SharedModule, ModalRoutingModule],
  exports: [ModalComponent],
  bootstrap: [ModalComponent],
  entryComponents: [OtherComponent],
})
export class ModalModule {}
