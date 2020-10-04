import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Title } from '@angular/platform-browser';
import { ClienteModel } from '../cliente.model';
import { SwalService } from 'src/app/shared/service/swal.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {
  public clientes: ClienteModel[] = [];
  public isLoading = false;
  public paginator: any;
  public params: any = {
    page: 0,
    limit: 5,
    orderBy: 'id',
    shape: 'desc',
  };

  constructor(
    private titleService: Title,
    private clienteService: ClienteService,
    private swalService: SwalService
  ) {
    titleService.setTitle('Lista de Clientes');
  }

  ngOnInit() {
    this.getClientes();
  }

  private getClientes() {
    this.isLoading = true;
    this.clienteService.findAll(this.params).subscribe(
      (res) => {
        this.isLoading = false;
        this.clientes = res.content as ClienteModel[];
        this.paginator = res;
      },
      (err) => {
        this.isLoading = false;
        console.error(err);
      }
    );
  }

  public async deleteCliente(cliente: ClienteModel) {
    const result = await this.swalService.confirm(
      '¿Está seguro que desea eliminar el registro?',
      `Está acción eliminara al cliente ${cliente.nombre.toUpperCase()} ${cliente.apellido.toUpperCase()}`
    );
    if (result.isConfirmed) {
      this.isLoading = true;
      this.clienteService.delete(cliente.id).subscribe(() => {
        this.isLoading = false;
        this.getClientes();
        this.swalService.success(
          'Cliente eliminado',
          'El cliente se eliminó con éxito.'
        );
      });
    }
  }
}
