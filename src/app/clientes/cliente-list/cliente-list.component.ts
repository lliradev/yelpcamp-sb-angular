import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Title } from '@angular/platform-browser';
import { ClienteModel } from '../cliente.model';
declare var swal: any;

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: ClienteModel[];

  constructor(private titleService: Title, private clienteService: ClienteService) {
    titleService.setTitle('Lista de Clientes');
  }

  ngOnInit() {
    this.getClientes();
  }

  private getClientes() {
    this.clienteService.findAll()
      .subscribe(res => {
        this.clientes = res
      }, err => console.error(err));
  }

  public deleteCliente(cliente: ClienteModel) {
    swal({
      title: "¿Está seguro que desea eliminar el registro?",
      text: `Está acción eliminara al cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: true,
    }).then((result: boolean) => {
      if (result) {
        this.clienteService.delete(cliente.id).subscribe(res => {
          this.getClientes();
          swal('Cliente eliminado', 'El cliente se eliminó con éxito.', 'success');
        });
      }
    });
  }

}
