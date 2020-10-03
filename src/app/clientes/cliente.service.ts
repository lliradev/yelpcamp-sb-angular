import { Injectable } from '@angular/core';
import { ClienteModel } from './cliente.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly url = `${environment.apiBaseUrl}/clientes`;

  constructor(private http: HttpClient) {}

  /**
   * Método para obtener el listado de los registros
   */
  public findAll(): Observable<ClienteModel[]> {
    const self = this;
    return self.http.get<ClienteModel[]>(self.url);
  }

  /**
   * Método para obtener un registro en especifico
   *
   * @param id identificador único del registro
   */
  public findById(id: number): Observable<ClienteModel> {
    return this.http.get<ClienteModel>(`${this.url}/${id}`);
  }

  /**
   * Método para crear un registro
   *
   * @param cliente objeto que se va a crear
   */
  public create(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.post<ClienteModel>(this.url, cliente);
  }

  /**
   * Método para editar un registro
   *
   * @param cliente objeto que se va a editar
   */
  public update(cliente: ClienteModel): Observable<ClienteModel> {
    return this.http.put<ClienteModel>(`${this.url}/${cliente.id}`, cliente);
  }

  /**
   * Método para eliminar un registro en especifico
   *
   * @param id identificador único del registro
   */
  public delete(id: number): Observable<ClienteModel> {
    return this.http.delete<ClienteModel>(`${this.url}/${id}`);
  }
}
