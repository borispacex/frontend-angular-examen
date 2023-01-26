import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrarClienteComponent } from './components/registrar-cliente/registrar-cliente.component';
import { FormsModule, ReactiveFormsModule }from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ActualizarClienteComponent } from './components/actualizar-cliente/actualizar-cliente.component';
import { DetalleClienteComponent } from './components/detalle-cliente/detalle-cliente.component';
import { RegistrarCuentaComponent } from './components/registrar-cuenta/registrar-cuenta.component';
import { ActualizarCuentaComponent } from './components/actualizar-cuenta/actualizar-cuenta.component';
import { DetalleCuentaComponent } from './components/detalle-cuenta/detalle-cuenta.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaClientesComponent,
    RegistrarClienteComponent,
    ActualizarClienteComponent,
    DetalleClienteComponent,
    RegistrarCuentaComponent,
    ActualizarCuentaComponent,
    DetalleCuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
