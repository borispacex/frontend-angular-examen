import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../classes/cliente';
import { endPoint } from '../global';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // Esta URL obtiene el listado de todos los empleados del backend
  private baseURL = `${endPoint}clientes`;

  constructor(private httpClient: HttpClient) {
    
  }

  // Metodo para obtener los clientes
  obtenerListaClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.baseURL}`);
  }

  // Metodo para guardar un cliente
  registrarCliente(cliente: Cliente): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, cliente)
  }

  // Metodo para actualizar un cliente
  actualizarCliente(id: number, cliente: Cliente): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, cliente);
  }

  // Metodo para obtener cliente por id
  obtenerClientePorId(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.baseURL}/${id}`)
  }

  // Medoto para eliminar un cliente
  eliminarCliente(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`)
  }
}
