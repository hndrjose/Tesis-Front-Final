import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuarios.models';
import { UserService } from '../../services/service.index';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { ActivatedRoute } from '@angular/router';
import { Comentarios } from '../../models/comentario.models';
import { Pedido } from '../../models/pedido.models';
import { ComentarioService } from '../../services/comentarios/comentario.service';
import { SocketsService } from '../../services/websocket/sockets.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-userchat',
  templateUrl: './userchat.component.html',
  styleUrls: ['./userchat.component.css']
})
export class UserchatComponent implements OnInit, OnDestroy {

test = 'esto es Web Socket';
fecha = new Date();
fecha2 = this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' +  this.fecha.getDate();
Hora = this.fecha.getHours() + ':' + this.fecha.getMinutes();
forma: FormGroup;
user: number;
usuario: Usuario;
Idchat: number;
param: string;
actividad2: any;
pedido: any;
comentarioss: any;
origen = 'C';
proveedor: number;
Idactividad: number;
role: string;
MsjSubcription: Subscription;


  constructor( public usuarioService: UserService, public activatedRoute: ActivatedRoute,
    public pedidoService: PedidosService, public comentarioService: ComentarioService, public socketService: SocketsService ) {
    this.usuario = usuarioService.usuario;
    this.role = this.usuario[0].role;
    activatedRoute.params.subscribe(
      params => {
           this.user = params['iduser'];
           this.proveedor = params['iduserpro'];
           this.Idactividad = params['idpedido'];
           this.cargarActividadID(this.Idactividad);
           // this.cargarPedido(idpedido);

           this.cargarComentarios( this.Idactividad, this.user);
       });
  }

  ngOnInit() {

    this.forma = new FormGroup({
      comentario: new FormControl( null, Validators.required )
    });
  }

  ngOnDestroy() {
   // this.MsjSubcription.unsubscribe();
  }

  cargarActividadID(Idactivi: number) {
    console.log('el parametro es:' + Idactivi);
    this.pedidoService.cargarActividadID(Idactivi).subscribe( ( resp: any ) =>  {
      this.actividad2 = resp;
    });
   }


  cargarPedido( termino: string ) {
    this.pedidoService.cargarPedido( termino ).subscribe( pedido  =>  this.pedido = pedido );
 }

  cargarComentarios( idactividad: number, idorigen: number ) {
    this.comentarioService.cargarComentarios( idactividad, idorigen ).subscribe( respuesta => this.comentarioss = respuesta );
  }

  cargarComentariosProv( idactividad: number, idorigen: number ) {
    this.comentarioService.cargarComentarios( idactividad, idorigen ).subscribe( respuesta => this.comentarioss = respuesta );
  }

  enviarComent() {
    this.Idchat = 0;

    let comentarios = new Comentarios(
      this.Idchat,
      this.fecha2,
      this.forma.value.comentario,
      this.usuario[0].Iduser,
      this.Idactividad,
      this.origen,
      this.user,
      this.Hora
    );
    // console.log(comentarios);
    this.comentarioService.crearComentario( comentarios ).subscribe();

    this.comentarioService.envioMensaje(this.forma.value.comentario);


  }

}
