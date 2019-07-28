import { Component, OnInit } from '@angular/core';
import { OrdenService } from 'src/app/shared/orden.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrdenItemsComponent } from '../orden-items/orden-items.component';
import Swal from "sweetalert2";

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  constructor(private _ordenService: OrdenService, private dialog:MatDialog) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form === null)
      form.resetForm()
    this._ordenService.formData = {
      Id: null,
      NoOrder: Math.floor(100000+Math.random()*9000000).toString(),
      ClienteId: 0,
      MetPago: '',
      PrecioTotal: 0
    }
    this._ordenService.ordenItems = [];
  }
  AddOrEditOrdenItem(OrdenItemIndex, OrdenID){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { OrdenItemIndex, OrdenID }
    this.dialog.open(OrdenItemsComponent, dialogConfig);
  }
  onDeleteOrdenItem(ordenItemId:number, i : number){
    Swal.fire({
      title: 'Estas segurx?',
      text: "Seguro de querer eliminar esto",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText:'No lo elimines'
    }).then((result) => {
      if (result.value) {
        this._ordenService.ordenItems.splice(i,1);
        Swal.fire(
          'Eliminado!',
          'El articulo ha sido eliminado',
          'success'
        )
      }
    })
  }
}
