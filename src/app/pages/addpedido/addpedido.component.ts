import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Pedido } from '../../models/pedido.models';
import { Usuario } from '../../models/usuarios.models';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { UserService } from '../../services/usuario/user.service';



@Component({
  selector: 'app-addpedido',
  templateUrl: './addpedido.component.html',
  styleUrls: ['./addpedido.component.css']
})
export class AddpedidoComponent implements OnInit {
 // dateDay = new Date().getDay();

  fecha = new Date();
  fecha2 = this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' +  this.fecha.getDate();
  Hora = this.fecha.getHours() + ':' + this.fecha.getMinutes();
  usuario: Usuario;
  pedido: Pedido;
  termino: number;
  terminos: boolean;
  validar: boolean;
  forma: FormGroup;
  forma2: FormGroup;

  constructor(public ruter: Router, public pedidoService: PedidosService,
    public usuarioService: UserService, public activatedRoute: ActivatedRoute ) {
    this.usuario = this.usuarioService.usuario;

    activatedRoute.params.subscribe(
      params => {
           this.termino = params['iduserpro'];
       });
  }

  ngOnInit() {
    this.terminos = false;
    this.validar = false;
    this.forma = new FormGroup({
      cardnumber: new FormControl( null, Validators.required ),
      expiremonth: new FormControl( null, Validators.required ),
      expiryyear: new FormControl( null, Validators.required ),
      ccv: new FormControl( null, Validators.required ),
      namecard: new FormControl( null, Validators.required ),
      terminos: new FormControl(),
    });
  }

  guardarDatos( forma: NgForm ) {
    let status = 'pendiente';
    let visto = 'N';
    const pedido = new Pedido(this.usuario[0].Iduser, this.usuario[0].user, this.fecha2, this.Hora,
      forma.value.valor, status, this.termino, visto);
    if (this.terminos) {
     this.pedidoService.crearpedido(pedido).subscribe();
     console.log('pagado');
    } else {
      console.log('No pagar');
    }
  }

  SalvarDatos() {
    console.log(this.terminos);
    if (this.terminos === true) {
      console.log('Acepta');
      this.validar = true;
    } else {
      console.log('No Acepta');
      this.validar = false;
    }
  }

  estado() {
    this.terminos = this.forma.value.terminos;
    console.log(this.terminos);
  }


}
