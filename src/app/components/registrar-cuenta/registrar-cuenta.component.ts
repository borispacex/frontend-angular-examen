import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuenta } from 'src/app/classes/cuenta';
import { CuentaService } from 'src/app/services/cuenta.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-registrar-cuenta',
  templateUrl: './registrar-cuenta.component.html',
  styleUrls: ['./registrar-cuenta.component.css']
})
export class RegistrarCuentaComponent implements OnInit {

  cuenta: Cuenta = new Cuenta();
  id: number;

  bsConfig = {
    isAnimated: true,
    dateInputFormat: 'YYYY-MM-DD'
  };

  cuentaForm: FormGroup;

  tiposCuenta: any[];
  monedas: any[];
  sucursales: any[];

  constructor(private cuentaService: CuentaService, private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.crearForm();
    this.id = this.route.snapshot.params['id'];
    // seteamos fecha actual
    this.setDefaultValuesForm();
    this.obtenerData();
  }

  setDefaultValuesForm() {
    const fechaActual = new Date();
    const fechaActualString = this.formatDateToString(fechaActual);
    this.cuenta.fechaCreacion = fechaActualString;
    this.cuenta.tipoCuenta = '';
    this.cuenta.moneda = '';
    this.cuenta.sucursal = '';
    this.cuenta.monto = 0;
  }

  crearForm() {
    this.cuentaForm = new FormGroup({
      tipoCuenta: new FormControl('', [Validators.required]),
      nroCuenta: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      moneda: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      fechaCreacion: new FormControl('', [Validators.required]),
      sucursal: new FormControl('', [Validators.required])
    });
  }

  guardarCuenta() {
    console.log(this.cuenta);
    this.cuenta.fechaCreacion = this.formatDateToStringSave(this.cuenta.fechaCreacion);
    this.cuentaService.registrarCuenta(this.cuenta, this.id).subscribe(dato => {
      console.log("Guardado ", dato);
      this.router.navigate(['detalle-cliente', this.id]);
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

  formatDateToStringSave(date: any) {
    date = new Date(date);
  
    var day = ('0' + (date.getDate() + 1)).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
  
    return year + '-' + month + '-' + day;
  }

  obtenerData() {
    this.dataService.obtenerTiposCuenta().subscribe(data => {
      this.tiposCuenta = data;
    });
    this.dataService.obtenerMonedas().subscribe(data => {
      this.monedas = data;
    });
    this.dataService.obtenerSucursales().subscribe(data => {
      this.sucursales = data;
    });
  }



}
