import { Injectable } from '@angular/core';
import { Orden } from './orden.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  formData:Orden;
  
  constructor() { }
}
