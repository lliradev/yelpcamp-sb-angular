import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ValidatorHelper } from 'src/app/shared/util/validator-helper';
import CustomPatternRegex from 'src/app/shared/util/custom-pattern-regex';
declare var swal: any;

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  clienteForm: FormGroup;
  cliente: ClienteModel = <ClienteModel>{};

  constructor(
    private titleService: Title,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    titleService.setTitle('Detalle del cliente');
  }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(CustomPatternRegex.EMAIL_PATTERN),
        ]),
      ],
    });
    this.setClienteToForm();
  }

  get formControls() {
    return this.clienteForm.controls;
  }

  public saveOrUpdate() {
    if (this.clienteForm.valid === false) {
      ValidatorHelper.validateAllFormFields(this.clienteForm);
      return;
    }
    if (!this.cliente.id) {
      this.clienteService.create(this.cliente).subscribe((response) => {
        console.log(response);
        this.clienteForm.reset();
        this.router.navigate(['/clientes']);
        swal('Cliente nuevo', 'El cliente se creó con éxito.', 'success');
      });
    } else {
      this.clienteService.update(this.cliente).subscribe((response) => {
        console.log(response);
        this.clienteForm.reset();
        this.router.navigate(['/clientes']);
        swal(
          'Cliente actualizado',
          'El cliente se actualizó con éxito.',
          'success'
        );
      });
    }
  }

  private setClienteToForm() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.clienteService
          .findById(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }
}
