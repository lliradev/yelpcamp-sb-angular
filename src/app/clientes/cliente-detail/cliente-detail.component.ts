import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ICustomEvent } from '@shared/model/custom-event.model';
import { SwalService } from '@shared/service/swal.service';
import { ClienteModel } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css'],
})
export class ClienteDetailComponent implements OnInit {
  @Input() public cliente: ClienteModel;
  @Output() reload = new EventEmitter();
  public isLoading = false;
  public progress = 0;
  private thumbnail: File;

  constructor(
    private clienteService: ClienteService,
    private swalService: SwalService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  public selectedPhoto(event: ICustomEvent) {
    this.thumbnail = event.target.files[0];
    this.progress = 0;
    if (this.thumbnail.type.indexOf('image') < 0) {
      this.swalService.error(
        'Error',
        'Solo se admiten imagenes con extensión .jpeg, .jpg y .png.'
      );
      this.thumbnail = null;
    }
  }

  public upload() {
    if (!this.thumbnail) {
      this.swalService.warning(
        'Seleccionar foto',
        'Debe seleccionar una foto.'
      );
    } else {
      this.isLoading = true;
      this.clienteService
        .upload(this.thumbnail, this.cliente.id)
        .then((event) => {
          this.isLoading = false;
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            const response: any = event.body;
            this.cliente = response.cliente as ClienteModel;
            this.reload.emit();
            this.swalService.success(
              'Foto',
              'La foto del cliente se ha subido con éxito.'
            );
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.error(err);
          this.swalService.error('Ocurrio un error', err.error.message);
        });
    }
  }

  public dismiss(action: string) {
    this.activeModal.dismiss(action);
    this.reload.emit();
  }

  public close(action: string) {
    this.activeModal.close(action);
    this.thumbnail = null;
    this.progress = 0;
    this.reload.emit();
  }
}
