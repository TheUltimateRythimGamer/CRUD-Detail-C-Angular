import { Injectable } from '@angular/core';
import { Orden } from './orden.model';
import { OrdenItem } from './orden-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  formData:Orden;
  ordenItems:OrdenItem[];
  
  constructor(private http:HttpClient) { }

  saveOrUpdateOrden(){
    var body = {
      ...this.formData, 
      OrdenItem: this.ordenItems
    };
    return this.http.post(environment.apiURL+'/Orden', body);
  }

  public getOrdenesList(){
    return this.http.get(environment.apiURL+'/Orden').toPromise();
  }
  public getOrdenById(id:number):any{
    return this.http.get(environment.apiURL+'/Orden/'+id).toPromise();
  }
}
