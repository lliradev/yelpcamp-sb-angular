/**
 * Clase para validar los campos del formulario
 *
 * @author Luis Lira <llira34>
 * @version 1.0
 */
import { FormGroup, FormControl } from '@angular/forms';

export class ValidatorHelper {
  public static validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
    return;
  }
}
