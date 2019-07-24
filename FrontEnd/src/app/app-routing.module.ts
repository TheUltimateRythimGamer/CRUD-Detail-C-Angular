import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { OrdenComponent } from './ordenes/orden/orden.component';


const routes: Routes = [
  {path:'ordenes',component: OrdenesComponent},
  {path:'orden', children:[
    {path:'',component:OrdenComponent},
    {path:'edit/:id',component:OrdenComponent}
  ]},
  {path:'**', redirectTo:'ordenes', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
