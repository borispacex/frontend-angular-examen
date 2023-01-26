import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/classes/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit {

  id: number;
  cliente: Cliente = new Cliente();

  bsConfig = {
    isAnimated: true,
    dateInputFormat: 'YYYY-MM-DD'
  }
  
  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteService.obtenerClientePorId(this.id).subscribe(dato => {
      this.cliente = dato;
      this.cliente.fechaNacimiento = new Date(this.cliente.fechaNacimiento);
      this.cliente.fechaNacimiento.setDate(this.cliente.fechaNacimiento.getDate() + 1); // add one day, for error

    });
  }

  actualizarCliente() {
    // console.log(this.cliente);
    // console.log(this.formatDateToString(this.cliente.fechaNacimiento))
    this.cliente.fechaNacimiento = this.formatDateToString(this.cliente.fechaNacimiento);
    this.clienteService.actualizarCliente(this.id, this.cliente).subscribe(dato => {
       console.log("Actualizado ", dato);
       this.router.navigate(['/clientes'])
     }, error => {
       console.log("Error ", error);
    });
  }

  formatDateToString(date: any) {
    date = new Date(date);
  
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
  
    return year + '-' + month + '-' + day;
  }

}
