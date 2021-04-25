import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SwalService } from '@shared/service/swal.service';
import { ClienteModel } from './cliente.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly url = `${environment.apiBaseUrl}/clientes`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private swalService: SwalService
  ) {}

  /**
   * Método para obtener el listado de los registros
   * @param params parámetros para filtrar la información
   */
  public findAll(params?: any): Promise<any> {
    return this.http.get(this.url, { params }).toPromise();
  }

  /**
   * Método para obtener un registro en especifico
   *
   * @param id identificador único del registro
   */
  public findById(id: number): Promise<ClienteModel> {
    return this.http
      .get<ClienteModel>(`${this.url}/${id}`)
      .pipe(
        catchError((e) => {
          console.error('Error aquí => ', e.error.message);
          this.router.navigate(['/clientes']);
          this.swalService.error('Error al editar', e.error.message);
          return throwError(e);
        })
      )
      .toPromise();
  }

  /**
   * Método para crear un registro
   *
   * @param cliente objeto que se va a crear
   */
  public insert(cliente: ClienteModel): Promise<ClienteModel> {
    return this.http
      .post<ClienteModel>(this.url, cliente)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          console.error('Error aquí => ', e.error.message);
          this.swalService.error(
            'Error al guardar el cliente',
            e.error.message
          );
          return throwError(e);
        })
      )
      .toPromise();
  }

  /**
   * Método para editar un registro
   *
   * @param cliente objeto que se va a editar
   */
  public update(cliente: ClienteModel): Promise<ClienteModel> {
    return this.http
      .put<ClienteModel>(`${this.url}/${cliente.id}`, cliente)
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(e);
          }
          console.error('Error aquí => ', e.error.message);
          this.swalService.error('Error al editar el cliente', e.error.message);
          return throwError(e);
        })
      )
      .toPromise();
  }

  /**
   * Método para eliminar un registro en especifico
   *
   * @param id identificador único del registro
   */
  public delete(id: number): Promise<ClienteModel> {
    return this.http
      .delete<ClienteModel>(`${this.url}/${id}`)
      .pipe(
        catchError((e) => {
          console.error('Error aquí => ', e.error.message);
          this.swalService.error(
            'Error al eliminar el cliente',
            e.error.message
          );
          return throwError(e);
        })
      )
      .toPromise();
  }

  /**
   * Método para subir una imagen de un cliente
   *
   * @param image archivo de imagen
   * @param id identificador del cliente
   * @returns promesa con el estatus del evento
   */
  public upload(image: File, id: number): Promise<HttpEvent<{}>> {
    const fd = new FormData();
    fd.append('image', image);
    fd.append('id', id.toString());
    return this.http
      .post(`${this.url}/upload`, fd, {
        reportProgress: true,
        observe: 'events',
      })
      .toPromise();
  }
}
