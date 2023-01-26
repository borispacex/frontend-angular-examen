import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarClienteComponent } from './components/actualizar-cliente/actualizar-cliente.component';
import { ActualizarCuentaComponent } from './components/actualizar-cuenta/actualizar-cuenta.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { DetalleCuentaComponent } from './components/detalle-cuenta/detalle-cuenta.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { RegistrarClienteComponent } from './components/registrar-cliente/registrar-cliente.component';
import { RegistrarCuentaComponent } from './components/registrar-cuenta/registrar-cuenta.component';

const routes: Routes = [
  { path: 'clientes', component: ListaClientesComponent },
  { path: '', redirectTo: 'clientes', pathMatch: 'full'},
  { path: 'registrar-cliente', component: RegistrarClienteComponent },
  { path: 'actualizar-cliente/:id', component: ActualizarClienteComponent },
  { path: 'detalle-cliente/:id', component: DetalleClienteComponent },
  { path: 'registrar-cuenta/:id', component: RegistrarCuentaComponent },
  { path: 'actualizar-cuenta/:idCliente/:id', component: ActualizarCuentaComponent },
  { path: 'detalle-cuenta/:id', component: DetalleCuentaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
