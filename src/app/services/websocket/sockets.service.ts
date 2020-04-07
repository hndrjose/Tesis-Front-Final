import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs/Rx';
import { URL_SERVICIO } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  public socketstatus = false;
  url = URL_SERVICIO;

  constructor(private socket: Socket) {
   // this.socket = io(this.url);
   this.checkstatus();
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
  
}
