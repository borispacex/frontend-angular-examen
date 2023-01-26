import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuenta } from '../classes/cuenta';
import { endPoint } from '../global';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  // Esta URL obtiene el listado de todos los empleados del backend
  private baseURL = `${endPoint}cuentas`;
  private baseURLManyToOne = `${endPoint}clientes`;

  constructor(private httpClient: HttpClient) {
    
  }

  // Metodo para obtener los cuentas
  obtenerListaCuentas(): Observable<Cuenta[]> {
    return this.httpClient.get<Cuenta[]>(`${this.baseURL}`);
  }

  // Metodo para obtener los cuentas por idCliente
  obtenerListaCuentasPorIdCliente(id: number): Observable<Cuenta[]> {
    return this.httpClient.get<Cuenta[]>(`${this.baseURLManyToOne}/${id}/cuentas`);
  }

  // Metodo para guardar un Cuenta, se necesita idCliente
  registrarCuenta(cuenta: Cuenta, id: number): Observable<Object> {
    return this.httpClient.post(`${this.baseURLManyToOne}/${id}/cuentas`, cuenta)
  }

  // Metodo para actualizar un Cuenta
  actualizarCuenta(id: number, cuenta: Cuenta): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, cuenta);
  }

  // Metodo para obtener Cuenta por id
  obtenerCuentaPorId(id: number): Observable<Cuenta> {
    return this.httpClient.get<Cuenta>(`${this.baseURL}/${id}`)
  }

  // Medoto para eliminar una cuenta
  eliminarCuenta(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`)
  }

  // Medoto para eliminar una cuenta por IdCliente
  eliminarCuentaPorIdCliente(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURLManyToOne}/${id}/cuentas`)
  }
}
