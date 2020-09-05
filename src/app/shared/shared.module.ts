/**
 * Modulo principal para importar y exportar todas las funcionalidades que ocupara el sistema
 * 
 * @author llira
 * @version 1.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
