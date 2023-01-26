import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuenta } from 'src/app/classes/cuenta';
import { CuentaService } from 'src/app/services/cuenta.service';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.css']
})
export class DetalleCuentaComponent implements OnInit {

  id: number;
  cuenta: Cuenta = new Cuenta();


  constructor(private router: Router, private route: ActivatedRoute, private cuentaService: CuentaService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.cuentaService.obtenerCuentaPorId(this.id).subscribe(dato => {
      this.cuenta = dato;
    });
  }

}
