import { Component, OnInit } from '@angular/core';
import { OrdenService } from '../shared/orden.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: []
})
export class OrdenesComponent implements OnInit {
  ordenList;
  constructor(private _ordenSer: OrdenService,
    private router: Router) { }

  ngOnInit() {
    this.refreshList();
  }
  refreshList() {
    this._ordenSer.getOrdenesList().then(res => { this.ordenList = res; },
      (err) => {
        Swal.fire({
          type: 'error', title: 'Error', text: 'No hay conexion con el servidor lo sentimos :,('
        })
      }
    );
  }
  editOrden(ordenId: number) {
    this.router.navigate(['/orden/edit/' + ordenId]);
  }
  onOrdenDelete(ordenId: number) {
    Swal.fire({
      title: 'Estas segurx?',
      text: "¿Seguro de querer eliminar esto?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No lo elimines'
    }).then((result) => {
      if (result.value) {
        this._ordenSer.deleteOrdenById(ordenId).then(
          res => this.refreshList()
        );
      }
    })
  }
}
