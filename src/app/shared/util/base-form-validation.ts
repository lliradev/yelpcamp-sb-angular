/**
 * Clase que contiene métodos para la validación de los campos del formulario reactivo
 *
 * @author Luis Lira <llira34>
 * @version 1.0
 */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class BaseFormValidation {
  public errorMessage: string;

  constructor() {}

  public isValidField(formGroup: FormGroup, field: string): boolean {
    this.getErrorMessage(formGroup, field);
    return (
      (formGroup.get(field).touched || formGroup.get(field).dirty) &&
      !formGroup.get(field).valid
    );
  }

  private getErrorMessage(formGroup: FormGroup, field: string) {
    const { errors } = formGroup.get(field);

    if (errors) {
      const minlength = errors.minlength;
      const maxlength = errors.maxlength;
      const messages = {
        required: 'Este campo es obligatorio.',
        pattern: 'El campo es inválido.',
        minlength: `El campo debe tener como mínimo ${minlength} caracteres.`,
        maxlength: `El campo debe tener como máximo ${maxlength} caracteres.`,
      };
      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
