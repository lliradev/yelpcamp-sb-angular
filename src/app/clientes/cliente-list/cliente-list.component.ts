import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { SwalService } from '@shared/service/swal.service';
import { Util } from '@shared/util/util';
import { ClienteDetailComponent } from '../cliente-detail/cliente-detail.component';
import { ClienteModel } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css'],
})
export class ClienteListComponent implements OnInit {
  public clientes: ClienteModel[] = [];
  public cliente: ClienteModel;
  public isLoading = false;
  public paginator: any;
  public params: any = {
    page: 0,
    limit: 5,
    orderBy: 'id',
    shape: 'desc',
  };

  constructor(
    titleService: Title,
    private clienteService: ClienteService,
    private swalService: SwalService,
    private modal: NgbModal
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

  public openModal(cliente: ClienteModel) {
    const obj = Util.cloneObject(cliente);
    const options: NgbModalOptions = {
      size: 'xl',
    };
    const res = this.modal.open(ClienteDetailComponent, options);
    res.componentInstance.cliente = obj;
  }
}
