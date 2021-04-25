import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '@shared/service/swal.service';
import { BaseFormValidation } from '@shared/util/base-form-validation';
import CustomPatternRegex from '@shared/util/custom-pattern-regex';
import { Util } from '@shared/util/util';
import { ClienteModel } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  public clienteForm: FormGroup;
  public cliente: ClienteModel = {} as ClienteModel;
  public isLoading = false;
  public errors: string[];

  constructor(
    private titleService: Title,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private swalService: SwalService,
    public baseFormValidation: BaseFormValidation
  ) {
    this.titleService.setTitle('Detalle del cliente');
  }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
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

  public saveOrUpdate() {
    if (this.clienteForm.valid === false) {
      Util.validateAllFormFields(this.clienteForm);
      return;
    }
    if (!this.cliente.id) {
      this.save();
    } else {
      this.update();
    }
  }

  private save() {
    this.isLoading = true;
    this.clienteService
      .insert(this.cliente)
      .then(() => {
        this.isLoading = false;
        this.clienteForm.reset();
        this.router.navigate(['/clientes']);
        this.swalService.success(
          'Cliente nuevo',
          'El cliente se creó con éxito.'
        );
      })
      .catch((err) => {
        this.isLoading = false;
        this.swalService.error('Ocurrio un error', err.error.message);
      });
  }

  private update() {
    this.isLoading = true;
    this.clienteService
      .update(this.cliente)
      .then(() => {
        this.isLoading = false;
        this.clienteForm.reset();
        this.router.navigate(['/clientes']);
        this.swalService.success(
          'Cliente actualizado',
          'El cliente se actualizó con éxito.'
        );
      })
      .catch((err) => {
        this.isLoading = false;
        this.swalService.error('Ocurrio un error', err.error.message);
      });
  }

  private setClienteToForm() {
    // tslint:disable-next-line: deprecation
    this.route.params.subscribe((params) => {
      const id = params.id;
      if (id) {
        this.isLoading = true;
        this.clienteService
          .findById(id)
          .then((cliente) => {
            const obj = Util.cloneObject(cliente);
            this.isLoading = false;
            this.cliente = obj;
          })
          .catch((err) => {
            this.isLoading = false;
            console.error(err);
          });
      }
    });
  }

  public checkField(field: string): boolean {
    return this.baseFormValidation.isValidField(this.clienteForm, field);
  }
}
