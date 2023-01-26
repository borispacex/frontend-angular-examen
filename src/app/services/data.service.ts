import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tiposDocumento: any[] = [];
  monedas: any[] = [];
  sucursales: any[] = [];
  tiposCuenta: any[] = [];


  constructor(private httpClient: HttpClient) {
    this.obtenerDataTiposDocumento();
    this.obtenerDataMonedas();
    this.obtenerDataSucursales();
    this.obtenerDataTiposCuenta();
  }

  mostrarSucursal(codigo: string) {
    var found = this.sucursales.filter( item => {
      return item.codigo === codigo;
    });
    let value = '';
    if (found) value = found[0].nombre;
    return value;
  }

  mostrarMoneda(codigo: string) {
    var found = this.monedas.filter( item => {
      return item.codigo === codigo;
    });
    let value = '';
    if (found) value = found[0].nombre;
    return value;
  }

  mostrarTipoCuenta(codigo: string) {
    var found = this.tiposCuenta.filter( item => {
      return item.codigo === codigo;
    });
    let value = '';
    if (found) value = found[0].nombre;
    return value;
  }


  mostrarTipoDocumento(codigo: string) {
    var found = this.tiposDocumento.filter( item => {
      return item.codigo === codigo;
    });
    let value = '';
    if (found && found.length !== 0) value = found[0].nombre;
    return value;
    
  }

  mostrarGenero(codigo: string) {
    var found = '';
    switch (codigo) {
      case '1':
        found = 'Masculino';
        break;
      case '2':
        found = 'Femenino';
        break;
      default:
        found = 'Otro'
        break;
    }
    return found;
  }

  obtenerSucursales() {
    return this.httpClient.get<any[]>('assets/data/sucursales.json');
  }

  obtenerTiposCuenta() {
    return this.httpClient.get<any[]>('assets/data/tiposCuenta.json');
  }

  obtenerTiposDocumento() {
    return this.httpClient.get<any[]>('assets/data/tiposDocumento.json');
  }

  obtenerMonedas() {
    return this.httpClient.get<any[]>('assets/data/monedas.json');
  }


  // funciones para llenar vector de datos

  obtenerDataTiposDocumento() {
    this.obtenerTiposDocumento()
    .subscribe( data => {
      this.tiposDocumento = data;
    });
  }

  obtenerDataMonedas() {
    this.obtenerMonedas()
    .subscribe(data => {
      this.monedas = data;
    });
  }

  obtenerDataSucursales() {
    this.obtenerSucursales()
    .subscribe(data => {
      this.sucursales = data;
    });
  }

  obtenerDataTiposCuenta() {
    this.obtenerTiposCuenta()
    .subscribe(data => {
      this.tiposCuenta = data;
    });
  }

}
