import { Injectable } from '@angular/core';
import { Orden } from './orden.model';
import { OrdenItem } from './orden-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  formData:Orden;
  ordenItems:OrdenItem[];
  constructor() { }
}
