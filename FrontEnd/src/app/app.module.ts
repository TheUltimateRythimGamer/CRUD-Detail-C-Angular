import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog'; 
import { HttpClientModule } from "@angular/common/http";

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
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  entryComponents:[OrdenItemsComponent],
  providers: [OrdenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
