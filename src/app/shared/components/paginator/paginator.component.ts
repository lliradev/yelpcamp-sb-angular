import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit {
  @Input() paginator: any;
  @Output() reload = new EventEmitter();
  @Input() params: any = {
    page: 0,
    limit: 5,
    orderBy: 'id',
    shape: 'desc',
  };
  public pages: number[];
  public totalElements: number;

  constructor() {}

  ngOnInit() {
    this.pages = new Array(this.paginator.totalPages);
    this.totalElements = this.paginator.totalElements;
  }

  /**
   * Método para setear la página que esta seleccionada
   *
   * @param i valor a mostrar en la paginación
   * @param event <any>
   */
  public setPage(i: number, event: any) {
    event.preventDefault();
    this.params.page = i;
    this.reload.emit();
  }

  /**
   * Método para la anterior página
   *
   * @param event <any>
   */
  public prev(event: any) {
    event.preventDefault();
    this.params.page = this.params.page - 1;
    this.reload.emit();
  }

  /**
   * Método para la siguiente página
   *
   * @param event <any>
   */
  public next(event: any) {
    event.preventDefault();
    this.params.page = this.params.page + 1;
    this.reload.emit();
  }

  /**
   * Método para cambiar el límite
   *
   * @param value <string>
   */
  public onChangeLimit(value: string) {
    this.params.limit = +value;
    this.reload.emit();
  }
}
