import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIO } from '../../config/config';


import { Usuario } from '../../models/usuarios.models';
import { Comentarios } from '../../models/comentario.models';

// ERROR in node_modules/sweetalert/typings/sweetalert.d.ts(4,9):
//  error TS2403: Subsequent variable declarations must have the same type.  Variable 'swal' cambiar a  _swal
import swal from 'sweetalert';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { SubirarchivoService } from '../subirarchivo/subirarchivo.service';
import { DatosEmail } from '../../models/datos.models';
import { SocketsService } from '../websocket/sockets.service';
import { UserService } from '../usuario/user.service';



@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  user: Usuario;

  constructor(public http: HttpClient, public router: Router, public socketsService: SocketsService
    , public usuarioService: UserService) {
      this.user = this.usuarioService.usuario;
     }


  crearComentario( comentario: Comentarios ) {
    const url = URL_SERVICIO + '/crearComentario' ;

    return this.http.post( url, comentario )
    .map( (resp: any) => {
       // swal('Usuario Creado', usuario.email, 'success');
        return resp.respuesta;
       })
       .catch( err => {
        console.log( err.error.mensaje );
     //   swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw( err );
       });
  }

  cargarComentarios(Idactividad: number, Idorigen: number) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/SelecComentPed/' + Idactividad + '/' + Idorigen;
    return this.http.get(url)
    .map( (resp: any) => resp.respuesta );
  }

  cargarComentariosPerfil(termino: string) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/SelecComentPerfil/' + termino ;
    return this.http.get(url)
    .map( (resp: any) => resp.respuesta );
  }

  envioMensaje(mensaje: string) {
    const payload = {
      de: this.user[0].user,
      menj: mensaje
    };

    this.socketsService.emit('mensaje', payload);
  }

  getMessage() {
    return this.socketsService.listen('mensaje-nuevo');
  }

  getMessagePrivate() {
    return this.socketsService.listen('mensaje-privado');
  }
}
