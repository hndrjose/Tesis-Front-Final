import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuarios.models';
import { UserService } from '../../services/service.index';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { ActivatedRoute } from '@angular/router';
import { Comentarios } from '../../models/comentario.models';
import { Pedido } from '../../models/pedido.models';
import { ComentarioService } from '../../services/comentarios/comentario.service';
import { SocketsService } from '../../services/websocket/sockets.service';



@Component({
  selector: 'app-userchat',
  templateUrl: './userchat.component.html',
  styleUrls: ['./userchat.component.css']
})
export class UserchatComponent implements OnInit {

test = 'esto es Web Socket';
fecha = new Date();
fecha2 = this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' +  this.fecha.getDate();
Hora = this.fecha.getHours() + ':' + this.fecha.getMinutes();
forma: FormGroup;
user: string;
usuario: Usuario;
idpedidoparam: number;
Idchat: number;
param: string;
pedido = new Pedido('', '', '', '', 0, '', 0, '');
comentarioss: any;
origen = 'C';

  constructor( public usuarioService: UserService, public activatedRoute: ActivatedRoute,
    public pedidoService: PedidosService, public comentarioService: ComentarioService, public socketService: SocketsService ) {
    this.usuario = usuarioService.usuario;

    activatedRoute.params.subscribe(
      params => {
           this.idpedidoparam =  params['idpedido']
           this.user = params['iduser'];
           let idpedido = params['idpedido'];
           this.cargarPedido(idpedido);
           this.cargarComentarios( idpedido );
       });
  }

  ngOnInit() {
    this.socketService.listen('test event').subscribe( (data) => {
      console.log(data);
    });
    this.forma = new FormGroup({
      comentario: new FormControl( null, Validators.required )
    });
  }

  cargarPedido( termino: string ) {
    // console.log('Id Pedido: ' + termino );
    // console.log('Id del usuario contratante: ' + this.user);
    // console.log('Id del Proveedor: ' + this.usuario[0].Iduser);
    this.pedidoService.cargarPedido( termino ).subscribe( pedido  =>  this.pedido = pedido );
   // console.log(this.usuario[0].Iduser);
  }

  cargarComentarios( idpedido: string ) {

    this.comentarioService.cargarComentarios( idpedido ).subscribe( respuesta => this.comentarioss = respuesta );
  }

  enviarComent() {

    this.Idchat = 0;

    let comentarios = new Comentarios(
      this.Idchat,
      this.fecha2,
      this.forma.value.comentario,
      this.usuario[0].Iduser,
      this.idpedidoparam,
      this.origen
    );
    console.log(comentarios);
    this.comentarioService.crearComentario( comentarios ).subscribe();
  }

}
