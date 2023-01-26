import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/classes/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  cliente: Cliente = new Cliente();

  bsConfig = {
    isAnimated: true,
    dateInputFormat: 'YYYY-MM-DD'
  }

  clienteForm: FormGroup;

  tiposDocumento: any[];

  constructor(private clienteService: ClienteService, private router: Router, private dataService: DataService) {
    
  }
  ngOnInit(): void {
    this.crearForm();
    this.cliente.tipoDocumento = '';
    this.obtenerData();
  }

  crearForm() {
    this.clienteForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      paterno: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      materno: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      tipoDocumento: new FormControl('', [Validators.required]),
      documento: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required])
    });
  }

  guardarCliente() {
    console.log(this.cliente);
    this.cliente.fechaNacimiento = this.formatDateToString(this.cliente.fechaNacimiento);
    this.clienteService.registrarCliente(this.cliente).subscribe(dato => {
       console.log("Guardado ", dato);
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

  obtenerData() {
    this.dataService.obtenerTiposDocumento().subscribe(data => {
      this.tiposDocumento = data;
    });
  }

}
