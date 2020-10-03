import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ValidatorHelper } from 'src/app/shared/util/validator-helper';
import { SwalService } from 'src/app/shared/service/swal.service';
import { BaseFormValidation } from 'src/app/shared/util/base-form-validation';
import CustomPatternRegex from 'src/app/shared/util/custom-pattern-regex';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
})
export class ClienteFormComponent implements OnInit {
  public clienteForm: FormGroup;
  public cliente: ClienteModel = {} as ClienteModel;

  constructor(
    private titleService: Title,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private swalService: SwalService,
    public baseFormValidation: BaseFormValidation
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

  public saveOrUpdate() {
    if (this.clienteForm.valid === false) {
      ValidatorHelper.validateAllFormFields(this.clienteForm);
      return;
    }

    if (!this.cliente.id) {
      this.clienteService.insert(this.cliente).subscribe((response) => {
        console.log(response);
        this.clienteForm.reset();
        this.router.navigate(['/clientes']);
        this.swalService.success(
          'Cliente nuevo',
          'El cliente se creó con éxito.'
        );
      });
    } else {
      this.clienteService.update(this.cliente).subscribe((response) => {
        console.log(response);
        this.clienteForm.reset();
        this.router.navigate(['/clientes']);
        this.swalService.success(
          'Cliente actualizado',
          'El cliente se actualizó con éxito.'
        );
      });
    }
  }

  private setClienteToForm() {
    this.route.params.subscribe((params) => {
      const id = params.id;
      if (id) {
        this.clienteService
          .findById(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  public checkField(field: string): boolean {
    return this.baseFormValidation.isValidField(this.clienteForm, field);
  }
}
