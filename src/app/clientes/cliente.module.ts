import { NgModule } from '@angular/core';

import { ClienteRouting } from './cliente.routing';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteService } from './cliente.service';
import { SharedModule } from '@shared/shared.module';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';

@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteFormComponent,
    ClienteDetailComponent,
  ],
  imports: [SharedModule, ClienteRouting],
  providers: [ClienteService],
})
export class ClienteModule {}
