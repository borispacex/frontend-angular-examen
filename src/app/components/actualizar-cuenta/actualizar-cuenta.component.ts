import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuenta } from 'src/app/classes/cuenta';
import { CuentaService } from 'src/app/services/cuenta.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-actualizar-cuenta',
  templateUrl: './actualizar-cuenta.component.html',
  styleUrls: ['./actualizar-cuenta.component.css']
})
export class ActualizarCuentaComponent implements OnInit {

  cuenta: Cuenta = new Cuenta();
  id: number;
  idCliente: number;

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
    this.idCliente = this.route.snapshot.params['idCliente'];
    this.obtenerData();
    // actualizams form
    this.cuentaService.obtenerCuentaPorId(this.id).subscribe(dato => {
      this.cuenta = dato;
      this.cuenta.fechaCreacion = new Date(this.cuenta.fechaCreacion);
      this.cuenta.fechaCreacion.setDate(this.cuenta.fechaCreacion.getDate() + 1); // add one day, for error
    });
  }

  crearForm() {
    this.cuentaForm = new FormGroup({
      tipoCuenta: new FormControl('', [Validators.required]),
      nroCuenta: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      moneda: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      fechaCreacion: new FormControl('', [Validators.required]),
      sucursal: new FormControl('', [Validators.required])
    });
  }

  actualizarCuenta() {
    console.log(this.cuenta);
    console.log(this.formatDateToString(this.cuenta.fechaCreacion));
    this.cuenta.fechaCreacion = this.formatDateToString(this.cuenta.fechaCreacion);
     this.cuentaService.actualizarCuenta(this.id, this.cuenta).subscribe(dato => {
       console.log("Actualizado ", dato);
       this.router.navigate(['detalle-cliente', this.idCliente]);
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
