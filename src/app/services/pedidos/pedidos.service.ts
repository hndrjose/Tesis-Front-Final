import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIO } from '../../config/config';

import { Usuario } from '../../models/usuarios.models';
import { Pedido } from '../../models/pedido.models';
import { Activades } from '../../models/actividades.models';




// ERROR in node_modules/sweetalert/typings/sweetalert.d.ts(4,9):
//  error TS2403: Subsequent variable declarations must have the same type.  Variable 'swal' cambiar a  _swal
import swal from 'sweetalert';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { SubirarchivoService } from '../subirarchivo/subirarchivo.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  verificar: string;
  pedido: Pedido;
  constructor( public http: HttpClient, public router: Router) { }


  crearpedido( pedido: Pedido ) {
    const url = URL_SERVICIO + '/adpedido' ;

    return this.http.post( url, pedido )
    .map( (resp: any) => {
        swal({title: 'Se Registro el Pedido', text: 'Gracias por Utilizar ServiTodo', timer: 2000 }); // , showConfirmButton: false
        return resp.usuario;
       })
       .catch( err => {
        console.log( err.error.mensaje );
     //   swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw( err );
       });
  }

  cargarPedido(termino: string) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/pedido/' + termino ;
    return this.http.get(url)
    .map( (resp: any) => resp.pedido );
  }

  //   swal({title: 'Se Registro el Pedido', text: 'Gracias por Utilizar ServiTodo', timer: 2000 }); // , showConfirmButton: false
  crearConteo( usuario: Usuario ) {
    const url = URL_SERVICIO + '/adConteo' ;
    let Iduser = usuario.Iduser;
    console.log(url);
    return this.http.post( url, usuario )
    .map( (resp: any) => {
        return resp.respuesta;
       })
       .catch( err => {
        console.log( err.error.mensaje );
        return Observable.throw( err );
       });
  }



  cargarPedidoPerfil(termino: string) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/Selecpedidos/' + termino ;
    return this.http.get(url)
    .map( (resp: any) => resp.usuarios );
  }

  cargarPedidoPerfilProv(termino: string) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/Selecpedidospro/' + termino ;
    return this.http.get(url)
    .map( (resp: any) => resp.usuarios );
  }

  cargarPedTerminados(termino: string) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/trabajosclose/' + termino ;
    return this.http.get(url)
    .map( (resp: any) => resp.terminados);
  }

  cargarPedPenTempo(termino: string) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/ContaReg/' + termino ;
    return this.http.get(url)
    .map( (resp: any) => resp.respuesta);
  }

  cargarRecaudado(termino: string) {
    let url = URL_SERVICIO + '/sumarvalor/' + termino ;
    return this.http.get(url)
    .map( (resp: any) => resp.resultado);
  }

  reiniciaContel( termino: string ) {
    let url = URL_SERVICIO + '/ReiniContaReg/' + termino ;
    return this.http.put(url, '')
    .map( (resp: any) => resp.resultado);
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////
  crearActividad( actividad: Activades ) {
    const url = URL_SERVICIO + '/crearActividad' ;

    return this.http.post( url, actividad )
    .map( (resp: any) => {
        swal({title: 'Un Nuevo Registro', text: 'Se creo una Nueva Actividad', timer: 2000 }); // , showConfirmButton: false
        return resp.ok;
       })
       .catch( err => {
        console.log( err.error.mensaje );
     //   swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw( err );
       });
  }

  editarActividad(actividad: Activades,  usuario: Usuario) {

    let url = URL_SERVICIO + '/editaractividad/' + usuario[0].Iduser;
    let verifica = Boolean;
    console.log('Del service ');
    console.log(actividad);
    return this.http.put( url, actividad )
                .map( (resp: any) => {
                 verifica = resp.ok;
                 if (verifica) {
                  console.log('Registro Acualizado');
                 }
                 swal('Registro actualizado', 'success' );
              });
  }

  borrarActividad( id: string ) {

    let url = URL_SERVICIO + '/borrarActividad/' + id;
    return this.http.delete( url )
                .map( resp => {
               //   swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                });

  }

  cargarActividades(Iduser: number, Idusuario2: number) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/selecactividad/' + Iduser + '/' + Idusuario2;
    return this.http.post(url, '')
    .map( (resp: any) => resp.respuesta );
  }

  cargarActividadesUser(Iduser: number) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/selecactividadUser/' + Iduser;
    return this.http.get(url)
    .map( (resp: any) => resp.respuesta );
  }

  cargarActividadID(Idactividad: number) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/selecactividadID/' + Idactividad;
    return this.http.get(url)
    .map( (resp: any) => resp.respuesta );
  }
}
