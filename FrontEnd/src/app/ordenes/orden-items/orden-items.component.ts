import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrdenItem } from 'src/app/shared/orden-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-orden-items',
  templateUrl: './orden-items.component.html',
  styleUrls: []
})
export class OrdenItemsComponent implements OnInit {
  formData: OrdenItem;
  itemList: Item [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef : MatDialogRef<OrdenItemsComponent>,
    private _Item:ItemService) {
    }

  ngOnInit() {
    this._Item.getItemList().then( res => {this.itemList = res as Item[]},
      (err)=>{
        console.log(err);
        Swal.fire({
          type:'error',
          title: 'Error',
          text:'No hay conexion con el servidor lo sentimos :,('
        })
      });
    this.formData = {
      OrdenItemId: null,
      OrdenId: this.data.OrdenID,
      ItemId: 0, 
      NombreItem: '',
      Precio: 0,
      Cantidad: 0,
      Total:0
    }
  }
  updatePrecio(ctrl){
    if(ctrl.selectedIndex == 0){      
      this.formData.Precio = 0;
    }
    else {
      this.formData.Precio = this.itemList[ctrl.selectedIndex-1].Precio;
      console.log(this.formData.Precio);
      
    }
  }
  

}
