import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteListComponent,
  },
  {
    path: 'create',
    component: ClienteFormComponent,
  },
  {
    path: 'edit/:id',
    component: ClienteFormComponent,
  },
  {
    path: 'detail/:id',
    component: ClienteDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteRouting {}
