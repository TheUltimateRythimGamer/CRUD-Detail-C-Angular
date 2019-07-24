import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { OrdenComponent } from './ordenes/orden/orden.component';
import { OrdenItemsComponent } from './ordenes/orden-items/orden-items.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdenesComponent,
    OrdenComponent,
    OrdenItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
