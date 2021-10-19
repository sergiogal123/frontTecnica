import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearFacturaComponent } from './components/crear-factura/crear-factura.component';
import { ListarFacturasComponent } from './components/listar-facturas/listar-facturas.component';

const routes: Routes = [
  { path: '', component: ListarFacturasComponent},
  { path: 'crear-Factura', component: CrearFacturaComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
