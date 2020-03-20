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



@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(public http: HttpClient, public router: Router) { }


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

  cargarComentarios(termino: string) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/SelecComentPed/' + termino ;
    return this.http.get(url)
    .map( (resp: any) => resp.respuesta );
  }

  cargarComentariosPerfil(termino: string) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/SelecComentPerfil/' + termino ;
    return this.http.get(url)
    .map( (resp: any) => resp.respuesta );
  }
}
