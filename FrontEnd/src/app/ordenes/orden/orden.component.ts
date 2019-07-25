import { Component, OnInit } from '@angular/core';
import { OrdenService } from 'src/app/shared/orden.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  constructor(private _ordenService: OrdenService) { }

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

}
