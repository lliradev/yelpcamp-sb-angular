/**
 * Clase con las utilerias generales
 *
 * @author Luis Lira <llira34>
 * @version 1.0
 */
import { FormGroup, FormControl } from '@angular/forms';

export class Util {
  /**
   * Método para clonar un objeto sin referencias.
   *
   * @param object <any>
   */
  public static cloneObject(object: any): any {
    return JSON.parse(JSON.stringify(object));
  }

  /**
   * Método para validar todos los campos del formulario
   *
   * @param formGroup <FormGroup>
   */
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
