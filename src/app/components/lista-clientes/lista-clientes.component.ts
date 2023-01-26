import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Cliente } from 'src/app/classes/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService, private router: Router, private dataService: DataService) { }


  ngOnInit(): void {
    this.obtenerClientes();
  }

  private obtenerClientes() {
    this.clienteService.obtenerListaClientes().subscribe(dato => {
      this.clientes = dato;
    });
  }

  actualizarCliente(id: number) {
    this.router.navigate(['actualizar-cliente', id])
  }

  eliminarCliente(id: number) {
    this.clienteService.eliminarCliente(id).subscribe(dato => {
      console.log("Eliminado ", dato);
      this.obtenerClientes();
    }, error => {
      console.log("Error al eliminar cliente ", error)
    });
  }
  detallesCliente(id: number) {
    this.router.navigate(['detalle-cliente', id]);
  }

  nuevoCliente(){
    this.router.navigate(['registrar-cliente']);
  }

  mostrarTipoDocumento(codigo: string) {
    return this.dataService.mostrarTipoDocumento(codigo);
  }

  mostrarGenero(codigo: string) {
    return this.dataService.mostrarGenero(codigo);
  }

}
