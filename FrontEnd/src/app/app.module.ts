import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { OrdenComponent } from './ordenes/orden/orden.component';
import { OrdenItemsComponent } from './ordenes/orden-items/orden-items.component';
import { OrdenService } from './shared/orden.service';

@NgModule({
  declarations: [
    AppComponent,
    OrdenesComponent,
    OrdenComponent,
    OrdenItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule
  ],
  providers: [OrdenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
