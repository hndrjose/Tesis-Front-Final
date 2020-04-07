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
valor: any;
pedido: any[];
pendiente: any[];
racaudado: any[];
role: string;

  constructor( public usuarioService: UserService, public dataperfilService: DataPerfilService,
    public pedidoService: PedidosService ) {
      this.socket = io();
      this.usuario = this.usuarioService.usuario;
      this.role = this.usuario[0].role;
  }


  forma: FormGroup;
  verifica: any;

  ngOnInit() {
    this.socket.on( 'usuarioLoging', () => {
    });
    this.cargarPuntuaciones();
    this.cargarPedidoTerminado();
    this.cargarPedidoPendiente();
    this.cargarvalorRecaudado();
  }


  cargarPuntuaciones() {
    let termino = this.usuario[0].Iduser;
    this.dataperfilService.cargarPuntuacion( termino ).subscribe( puntuacion => this.valor = puntuacion );
  }

  cargarPedidoTerminado() {
    let termino = this.usuario[0].Iduser;
    this.pedidoService.cargarPedTerminados( termino ).subscribe( terminados => this.pedido = terminados );
  }

  cargarPedidoPendiente() {
    let termino = this.usuario[0].Iduser;
    this.pedidoService.cargarPedPenTempo( termino ).subscribe( respuesta => this.pendiente = respuesta );
  }

  cargarvalorRecaudado() {
    let termino = this.usuario[0].Iduser;
    this.pedidoService.cargarRecaudado( termino ).subscribe( resultado => this.racaudado = resultado );
  }
 }
