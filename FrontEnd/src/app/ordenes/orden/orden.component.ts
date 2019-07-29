import { Component, OnInit } from '@angular/core';
import { OrdenService } from 'src/app/shared/orden.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrdenItemsComponent } from '../orden-items/orden-items.component';
import Swal from "sweetalert2";
import { ClienteService } from 'src/app/shared/cliente.service';
import { Cliente } from 'src/app/shared/cliente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: []
})
export class OrdenComponent implements OnInit {

  clienteLista:Cliente[];
  isValid:boolean = true;

  constructor(public _ordenService: OrdenService, 
              private dialog:MatDialog,
              private _clienteService:ClienteService,
              private router:Router
    ) { }

  ngOnInit() {
    this.resetForm();
    this._clienteService.getClienteList().then(res  => this.clienteLista = res as Cliente[]);
    
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
    this.dialog.open(OrdenItemsComponent, dialogConfig).afterClosed().subscribe(res => this.updateTotalFinal());
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
        this.updateTotalFinal();
        Swal.fire(
          'Eliminado!',
          'El articulo ha sido eliminado',
          'success'
        )
      }
    })
  }
  updateTotalFinal(){
    this._ordenService.formData.PrecioTotal = 
      this._ordenService.ordenItems.reduce((prev, curr)=>{
      return prev + curr.Total;
    },0);
    this._ordenService.formData.PrecioTotal =
          parseFloat(this._ordenService.formData.PrecioTotal.toFixed(2));
  }
  validateForm(){
    this.isValid = true; 
    if(this._ordenService.formData.ClienteId == 0)
      this.isValid = false; 
    else if (this._ordenService.ordenItems.length == 0)
      this.isValid = false;
    return this.isValid;
  }
  onSubmit(form:NgForm){
    if(this.validateForm()){
      this._ordenService.saveOrUpdateOrden().subscribe(res =>{
        this.resetForm();
        Swal.fire({
          title: 'Listo!!!',
          text: "Se ha guardado el pedido exitosamente",
          type: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ver ordenes creadas',
          cancelButtonText:'No, Gracias'
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/ordenes'])
          }
        }); 
      });
    }else{
      Swal.fire({
        type: 'error',
        title: 'Tienes algunos errores',
        text: 'Por favor, añede un cliente o comida.'
      })
    }
  }

}
