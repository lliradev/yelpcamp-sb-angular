import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SwalService {
  /**
   * Mostrar alerta de éxito
   *
   * @param title título de la alerta
   * @param message mensaje personalizado de la alerta
   */
  public success(title: string, message: string) {
    Swal.fire(title, message, 'success');
  }

  public info() {}

  public warning() {}

  /**
   * Método para mostrar una alerta de error
   * @param title título de la alerta
   * @param error error que envía el servidor
   */
  public error(title: string | any, error: any) {
    Swal.fire(title, error, 'error');
  }

  /**
   * Método para confirmar la eliminación de un registro
   *
   * @param title título de la alerta
   * @param message mensaje personalizado de la alerta
   */
  public confirm(
    title: string,
    message: string
  ): Promise<SweetAlertResult<boolean>> {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });
  }
}
