import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ValidatorHelper } from 'src/app/shared/util/validator.helper';
declare var swal: any;

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  clienteForm: FormGroup;
  cliente: ClienteModel = <ClienteModel>{};
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private titleService: Title,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    titleService.setTitle('Detalle del cliente');
  }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)])],
    });
    this.setClienteToForm();
  }

  get formControls() { return this.clienteForm.controls; }

  public saveOrUpdate() {
    if (this.clienteForm.valid === false) {
      ValidatorHelper.validateAllFormFields(this.clienteForm);
      return;
    }
    if (!this.cliente.id) {
      this.clienteService.create(this.cliente).subscribe(response => {
        console.log(response);
        this.clienteForm.reset();
        this.router.navigate(['/clientes']);
        swal('Cliente nuevo', 'El cliente se creó con éxito.', 'success');
      });
    } else {
      this.clienteService.update(this.cliente).subscribe(response => {
        console.log(response);
        this.clienteForm.reset();
        this.router.navigate(['/clientes']);
        swal('Cliente actualizado', 'El cliente se actualizó con éxito.', 'success');
      });
    }
  }

  private setClienteToForm() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.findById(id).subscribe(cliente => this.cliente = cliente);
      }
    });
  }
}
