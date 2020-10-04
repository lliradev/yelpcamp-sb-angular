import { Injectable } from '@angular/core';
import { ClienteModel } from './cliente.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { SwalService } from '../shared/service/swal.service';

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
  public findAll(params?: any): Observable<any> {
    return this.http.get(`${this.url}/paginated`, { params }).pipe(
      map((res: any) => {
        (res.content as ClienteModel[]).map((x) => {
          x.createdAt = formatDate(x.createdAt, 'dd/MM/yyyy', 'en-MX');
          return x;
        });
        return res;
      })
    );
  }

  /**
   * Método para obtener un registro en especifico
   *
   * @param id identificador único del registro
   */
  public findById(id: number): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`${this.url}/${id}`).pipe(
      catchError((e) => {
        console.error('Error aquí => ', e.error.message);
        this.router.navigate(['/clientes']);
        this.swalService.error('Error al editar', e.error.message);
        return throwError(e);
      })
    );
  }

  /**
   * Método para crear un registro
   *
   * @param cliente objeto que se va a crear
   */
  public insert(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.post<ClienteModel>(this.url, cliente).pipe(
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error('Error aquí => ', e.error.message);
        this.swalService.error('Error al guardar el cliente', e.error.message);
        return throwError(e);
      })
    );
  }

  /**
   * Método para editar un registro
   *
   * @param cliente objeto que se va a editar
   */
  public update(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http
      .put<ClienteModel>(`${this.url}/${cliente.id}`, cliente)
      .pipe(
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error('Error aquí => ', e.error.message);
          this.swalService.error('Error al editar el cliente', e.error.message);
          return throwError(e);
        })
      );
  }

  /**
   * Método para eliminar un registro en especifico
   *
   * @param id identificador único del registro
   */
  public delete(id: number): Observable<ClienteModel> {
    return this.http.delete<ClienteModel>(`${this.url}/${id}`).pipe(
      catchError((e) => {
        console.error('Error aquí => ', e.error.message);
        this.swalService.error('Error al eliminar el cliente', e.error.message);
        return throwError(e);
      })
    );
  }
}
