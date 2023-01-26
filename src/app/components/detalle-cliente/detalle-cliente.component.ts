import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/classes/cliente';
import { Cuenta } from 'src/app/classes/cuenta';
import { ClienteService } from 'src/app/services/cliente.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {

  id: number;
  cliente: Cliente = new Cliente();

  cuentas: Cuenta[];

  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute, private cuentaService: CuentaService, private dataService: DataService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteService.obtenerClientePorId(this.id).subscribe(dato => {
      this.cliente = dato;
      this.cuentas = dato.cuentas;
    });
  }

  private obtenerCuentas(id: number) {
    this.cuentaService.obtenerListaCuentasPorIdCliente(id).subscribe(dato => {
      this.cuentas = dato;
    }, error => {
      console.log("Error al obtener cuentas", error);
    });
  }

  detallesCuenta(id: number) {
    this.router.navigate(['detalle-cuenta', id]);
  }
  
  actualizarCuenta(id: number) {
    this.router.navigate(['actualizar-cuenta', this.id , id])

  }

  eliminarCuenta(id: number) {
    this.cuentaService.eliminarCuenta(id).subscribe(dato => {
          console.log("Eliminado ", dato);
          this.obtenerCuentas(this.id);
        }, error => {
          console.log("Error al eliminar cuenta ", error)
        });
  }

  nuevaCuenta() {
    this.router.navigate(['registrar-cuenta', this.id]);
  }

  mostrarTipoDocumento(codigo: string) {
    return this.dataService.mostrarTipoDocumento(codigo);
  }

  mostrarGenero(codigo: string) {
    return this.dataService.mostrarGenero(codigo);
  }

  mostrarTipoCuenta(codigo: string) {
    return this.dataService.mostrarTipoCuenta(codigo);
  }

  mostrarMoneda(codigo: string) {
    return this.dataService.mostrarMoneda(codigo);
  }

  mostrarSucursal(codigo: string) {
    return this.dataService.mostrarSucursal(codigo);
  }

}
