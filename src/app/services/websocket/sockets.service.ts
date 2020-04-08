import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/Rx';
import { URL_SERVICIO } from '../../config/config';
import { Usuario } from '../../models/usuarios.models';
import { UserService } from '../usuario/user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  public socketstatus = false;
  public usuario: Usuario;
  url = URL_SERVICIO;

  constructor(private socket: Socket, public usuarioService: UserService) {
   // this.socket = io(this.url);
   this.checkstatus();
   this.cargarusuario();
   }

  // listen(eventemit: string) {
  //   return new Observable( (subcriber) => {
  //     this.socket.on(eventemit, (data) => {
  //       subcriber.next(data);
  //     });
  //   });
  // }

  listen( evento: string) {
    return this.socket.fromEvent(evento);

  }

  emit(eventemit: string, payload?: any, callback?: Function ) {
    this.socket.emit(eventemit, payload, callback);
  }

  checkstatus() {
    this.socket.on('connect', () => {
      console.log('connectado al servidor');
      this.socketstatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('desconnectado del servidor');
      this.socketstatus = false;
    });
  }

  LoginWs( user: string ) {


    return new Promise( (resolve, reject) =>  {
          this.emit('configurar-usuario', {user}, resp => {
            resolve();
          }); // ==>
    });
    //  ==>   este es lo mismo solo que se llama al metodo emit
    // this.socket.emit('configurar-usuario', {user}, (resp) => {
    //   console.log(resp);
    // });
  }

  cargarusuario() {
    this.LoginWs(this.usuarioService.usuario[0].user);
  }

}
