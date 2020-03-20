import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuarios.models';
import { UserService, DataPerfilService, PedidosService } from '../../services/service.index';
import { Puntuacion } from '../../models/puntuacion.models';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Rx';



@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

socket;
usuario: Usuario;
user: any;
imagenTemp: any;
valor: Puntuacion = new Puntuacion( 0, 0 );
pedido: any[];
pendiente: any[];
racaudado: any[];

  constructor( public usuarioService: UserService, public dataperfilService: DataPerfilService,
    public pedidoService: PedidosService ) {
      this.socket = io();
      this.usuario = this.usuarioService.usuario;
  }


  forma: FormGroup;
  verifica: any;

  ngOnInit() {
    this.socket.on( 'usuarioLoging', () => {
      console.log('un usuario esta logeado');
    });
    this.cargarPuntuaciones();
    this.cargarPedidoTerminado();
  //  this.cargarPedidoPendiente();
    this.cargarvalorRecaudado();
  }


  cargarPuntuaciones() {
      console.log(this.usuario[0].Iduser);
      let termino = this.usuario[0].Iduser;
      this.dataperfilService.cargarPuntuacion( termino ).subscribe( puntuacion => this.valor = puntuacion );
  }

  cargarPedidoTerminado() {
    let termino = this.usuario[0].Iduser;
    this.pedidoService.cargarPedTerminados( termino ).subscribe( terminados => this.pedido = terminados );
  }

  cargarPedidoPendiente() {
    let termino = this.usuario[0].Iduser;
    this.pedidoService.cargarPedPendientes( termino ).subscribe( respuesta => this.pendiente = respuesta );
  }

  cargarvalorRecaudado() {
    let termino = this.usuario[0].Iduser;
    this.pedidoService.cargarRecaudado( termino ).subscribe( resultado => this.racaudado = resultado );
  }
  // {{ pedido[0].terminados }}
}
