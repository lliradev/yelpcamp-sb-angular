/**
 * Modulo principal para importar y exportar todas las funcionalidades en común que ocupara el sistema
 *
 * @author Luis Lira <llira34>
 * @version 1.0
 */
import { CommonModule, registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-MX';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorComponent } from './components/paginator/paginator.component';

registerLocaleData(localeES, 'es-MX');

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, ReactiveFormsModule, NgbModule],
  exports: [CommonModule, ReactiveFormsModule, NgbModule, PaginatorComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
})
export class SharedModule {}
