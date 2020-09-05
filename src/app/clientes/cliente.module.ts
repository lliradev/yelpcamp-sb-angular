import { NgModule } from '@angular/core';

import { ClienteRouting } from './cliente.routing';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteService } from './cliente.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteFormComponent
  ],
  imports: [
    SharedModule,
    ClienteRouting,
  ],
  providers: [
    ClienteService
  ]
})
export class ClienteModule { }
