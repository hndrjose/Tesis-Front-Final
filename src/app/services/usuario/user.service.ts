import { Injectable} from '@angular/core';
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
export class UserService {

usuario: Usuario;
verificar: string;
logeo: string;
galeria: any;

  constructor( public http: HttpClient, public router: Router, public subirArchivo: SubirarchivoService ) {
    this.cargarStorage();
  }

  crearUsuario( usuario: Usuario ) {
    const url = URL_SERVICIO + '/crearUsuario' ;

    return this.http.post( url, usuario )
    .map( (resp: any) => {
        swal('Usuario Creado', usuario.email, 'success');
        return resp.usuario;
       })
       .catch( err => {
        console.log( err.error.mensaje );
     //   swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw( err );
       });
  }

  cargarUsuarios( ) {
    let url = URL_SERVICIO + '/users';
    return this.http.get( url )
              .map( (resp: any ) => {
                return resp.usuarios;
              });
  }

  VerificarUsuario( termino: number, usuario: Usuario ) {
    let verificar: string;
    let url = URL_SERVICIO + '/SelecionUsuario/' + termino;
    return this.http.get( url )
         .map( (resp: any ) =>  {
           verificar = resp.ok;
           console.log(verificar);
           if (verificar) {
             console.log('Existe el Registro');
           //  this.actualizarUsuario(usuario) .subscribe();
             return false;
           } else {
             console.log('No existe');
             this.crearUsuario(usuario).subscribe();
           }
     });
  }

    cargarUsuarioId( id: string ) {
      let url = URL_SERVICIO + '/SelecionUsuario/' + id;
      return this.http.get(url)
        .map( (resp: any) =>  resp.usuarios );
    }

    cargarUsuarioUser(termino: string) {
      let url = URL_SERVICIO + '/SelecionUser/' + termino;
      return this.http.get(url)
        .map( (resp: any) =>  resp.usuarios );
      // this.guardarStorage(resp.ok, resp.usuarios);
    }


    actualizarUsuario(usuario: Usuario ) {

      let url = URL_SERVICIO + '/editarUsuario/' + usuario.Iduser;
      let verifica = Boolean;
     // this.limpiarStorage();
      console.log('Del service ');
      console.log(usuario);
      return this.http.put( url, usuario )
                  .map( (resp: any) => {
                   verifica = resp.ok;
                   if (verifica) {
                    let usuarioDB: Usuario = resp.respuesta;
                    console.log('Nuevo Registro Acualizado');
                    console.log(usuarioDB);
                    this.guardarStorage(resp.ok, usuarioDB);
                   }
                   swal('Registro actualizado', 'success' );
                });
    }


    guardarStorage(ok: string, usuario: Usuario) {
      localStorage.setItem('ok', ok);
      localStorage.setItem('user', usuario.user);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.usuario = usuario;
      // this.token = token;
    }

    LogearUsuario( usuario: Usuario ) {
      let url = URL_SERVICIO + '/logUser';
      return this.http.post( url, usuario)
           .map( (resp: any ) =>  {
             this.verificar = resp.ok;
             if (this.verificar) {
                 this.guardarStorage( resp.ok, resp.usuarios );
              // return true;
              } else {
                 console.log('No existe');
                // swal('El Usuario o Contraceña esta Incorrecto', 'warning');
              }
       });
    }

   cargarStorage() {
    if ( localStorage.getItem('ok')) {
      this.verificar = localStorage.getItem('ok');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    //  this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
    //  this.token = '';
      this.usuario = null;
    //  this.menu = [];
    }
  }


  logout() {
    // this.usuario = null;
    this.verificar = '';
    localStorage.removeItem('ok');
    localStorage.removeItem('user');
    localStorage.removeItem('usuario');
    this.router.navigate(['/home']);
  }

  limpiarStorage() {
    localStorage.removeItem('ok');
    localStorage.removeItem('user');
    localStorage.removeItem('usuario');
  }


  estaLogueado() {
    console.log('esta log: ' + this.verificar);
    return ( this.verificar ) ? true : false;
  }

  cambiarImagen( archivo: File, id: string ) {
 // console.log( archivo + '  ' + id );
    this.subirArchivo.subirArchivo( archivo, 'usuario', id )
          .then( (resp: any) => {
            this.usuario[0].img = resp.usuarios;
            console.log('imgane:  ' + this.usuario[0].img);
           // swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
            this.guardarStorage( resp.ok,  this.usuario );
          })
          .catch( resp => {
            console.log( resp );
          }) ;
  }

  adgalery( archivo: File, id: string) {
    // console.log( archivo + '  ' + id );
       this.subirArchivo.subirArchivo2( archivo, 'usuario', id)
             .then( (resp: any) => {
               console.log('Imagen Subida');
              // swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
             })
             .catch( (resp: any) => {
               this.verificar = resp.okimg;
               if (this.verificar) {
                console.log('listo');
               }
             }) ;
     }

  enviarEmail( mail: DatosEmail ) {
    let url = URL_SERVICIO + '/formulario';
    return this.http.post( url, mail)
         .map( (resp: any ) =>  {
           this.verificar = resp;
           if (this.verificar) {
               return true;
            } else {
               console.log('Error al Enviar Correo');
               return false;
           }
     });
  }

}
