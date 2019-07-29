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
              private router:Router) { }

  ngOnInit() {
    this._ordenSer.getOrdenesList().then(res => {
      this.ordenList = res;
      console.log(res);
    }, (err) => {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: 'No hay conexion con el servidor lo sentimos :,('
      })
    }
    );
  }
  editOrden(ordenId:number){
    this.router.navigate(['/orden/edit/'+ordenId]);
  }

}
