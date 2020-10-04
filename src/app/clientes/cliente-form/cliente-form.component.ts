import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SwalService } from 'src/app/shared/service/swal.service';
import { BaseFormValidation } from 'src/app/shared/util/base-form-validation';
import { Util } from 'src/app/shared/util/util';
import CustomPatternRegex from 'src/app/shared/util/custom-pattern-regex';

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
    this.clienteService.insert(this.cliente).subscribe(
      (res) => {
        this.isLoading = false;
        console.log(res);
        this.clienteForm.reset();
        this.router.navigate(['/clientes']);
        this.swalService.success(
          'Cliente nuevo',
          'El cliente se creó con éxito.'
        );
      },
      (err) => {
        this.isLoading = false;
        this.errors = err.error.errors as string[];
      }
    );
  }

  private update() {
    this.isLoading = true;
    this.clienteService.update(this.cliente).subscribe(
      (res) => {
        this.isLoading = false;
        console.log(res);
        this.clienteForm.reset();
        this.router.navigate(['/clientes']);
        this.swalService.success(
          'Cliente actualizado',
          'El cliente se actualizó con éxito.'
        );
      },
      (err) => {
        this.isLoading = false;
        this.errors = err.error.errors as string[];
      }
    );
  }

  private setClienteToForm() {
    this.route.params.subscribe((params) => {
      const id = params.id;
      if (id) {
        this.isLoading = true;
        this.clienteService.findById(id).subscribe(
          (cliente) => {
            const obj = Util.cloneObject(cliente);
            this.isLoading = false;
            this.cliente = obj;
          },
          (err) => {
            this.isLoading = false;
            console.error(err);
          }
        );
      }
    });
  }

  public checkField(field: string): boolean {
    return this.baseFormValidation.isValidField(this.clienteForm, field);
  }
}
