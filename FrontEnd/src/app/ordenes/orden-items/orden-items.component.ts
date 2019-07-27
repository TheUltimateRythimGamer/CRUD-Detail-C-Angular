import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { OrdenItem } from 'src/app/shared/orden-item.model';
import { ItemService } from 'src/app/shared/item.service';

@Component({
  selector: 'app-orden-items',
  templateUrl: './orden-items.component.html',
  styleUrls: ['./orden-items.component.css']
})
export class OrdenItemsComponent implements OnInit {
  formData: OrdenItem;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef : MatDialogRef<OrdenItemsComponent>,
    private _Item:ItemService) { 

    }

  ngOnInit() {
    this._Item.getItemList().then(
      res => {console.log(res)}
    );
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

}
