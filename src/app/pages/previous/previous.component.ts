import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { DataPerfilService } from '../../services/service.index';
import { DataUser } from '../../models/data-user.models';
import { UserService } from '../../services/usuario/user.service';
import { Usuario } from '../../models/usuarios.models';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from '../../models/pedido.models';
import { ComentarioService } from '../../services/comentarios/comentario.service';
import { Comentarios } from '../../models/comentario.models';
import { Router } from '@angular/router';
import { Puntuacion } from '../../models/puntuacion.models';

@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.css']
})
export class PreviousComponent implements OnInit {

  fecha = new Date();
  fecha2 = this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' +  this.fecha.getDate();
  Hora = this.fecha.getHours() + ':' + this.fecha.getMinutes();
  forma: FormGroup;
  forma2: FormGroup;
  user: string;
  usuario2: any;
  usuario = new Usuario('', '', '', '', '', '', '', '', '', );
  imagenSubir: File;
  imagenTemp: any;
  verifica: any;
  data: any;
  idpedidoparam: string;
  Idchat: number;
  param: string;
  pedido = new Pedido('', '', '', '', 0, '', 0, '');
  comentarioss: any;
  origen = 'P';

  constructor(public usuarioService: UserService, public activatedRoute: ActivatedRoute, public comentarioService: ComentarioService,
    public router: Router, public dataperfilService: DataPerfilService) {
  this.usuario2 = this.usuarioService.usuario;
  activatedRoute.params.subscribe(
    params => {
         let termino = params['termino'];
         console.log(termino);
        //  this.usuarioService.cargarUsuarioId( termino ).subscribe( (resp: any) => { this.usuario = resp; });
        //  console.log(this.usuario);
         this.cargarusuarios(termino);
         this.cargarComentarios(termino);
         this.cargarScore(termino);
     });
  }

  ngOnInit() {

    this.forma = new FormGroup({
      comentario: new FormControl( null, Validators.required )
    });

    this.forma2 = new FormGroup({
      puntuacion: new FormControl( null, Validators.required )
      // estrellas4: new FormControl( null, Validators.required ),
      // estrellas3: new FormControl( null, Validators.required ),
      // estrellas2: new FormControl( null, Validators.required ),
      // estrellas1: new FormControl( null, Validators.required )
    });
  }


  cargarusuarios( termino: string ) {
    this.usuarioService.cargarUsuarioId( termino ).subscribe( usuarios  =>  this.usuario = usuarios );
   // console.log(this.usuario[0].Iduser);
  }

  enviarComent() {

    this.Idchat = 0;

    let comentarios = new Comentarios(
      this.Idchat,
      this.fecha2,
      this.forma.value.comentario,
      this.usuario2[0].Iduser,
      this.usuario.Iduser,
      this.origen
    );
    console.log(comentarios);
    this.comentarioService.crearComentario( comentarios ).subscribe();
  }

  calificar() {
    let calificar = new Puntuacion(
      this.forma2.value.puntuacion,
      this.usuario2[0].Iduser,
      this.usuario.Iduser
    );
    this.dataperfilService.crearpuntuacion(calificar).subscribe();
    console.log(calificar);
  }

  cargarComentarios( idpedido: string ) {

    this.comentarioService.cargarComentariosPerfil( idpedido ).subscribe( respuesta => this.comentarioss = respuesta );
  }

  cargarScore( id: number ) {
    this.dataperfilService.cargarPuntuacion( id ).subscribe( puntuacion => this.data = puntuacion );
  }

}
