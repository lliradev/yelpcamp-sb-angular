/**
 * Modulo principal para importar y exportar todas las funcionalidades en común que ocupara el sistema
 *
 * @author Luis Lira <llira34>
 * @version 1.0
 */
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import localeES from '@angular/common/locales/es-MX';

registerLocaleData(localeES, 'es-MX');

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CommonModule, ReactiveFormsModule, PaginatorComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'es-MX' }],
})
export class SharedModule {}
