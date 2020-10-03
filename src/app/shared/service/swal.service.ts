import { Injectable } from '@angular/core';

declare var swal: any;

@Injectable({ providedIn: 'root' })
export class SwalService {
  /**
   * Mostrar alerta de éxito
   * @param title título de la alerta
   * @param message mensaje personalizado de la alerta
   */
  public success(title: string, message: string) {
    swal(title, message, 'success');
  }

  public info() {}

  public warning() {}

  public error() {}

  /**
   * Método para confirmar la eliminación de un registro
   * @param title título de la alerta
   * @param message mensaje personalizado de la alerta
   */
  public confirm(title: string, message: string): Promise<boolean> {
    return swal({
      title,
      text: message,
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    });
  }
}
