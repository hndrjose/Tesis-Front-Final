import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Rx';
import { URL_SERVICIO } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  socket: any;
  url = URL_SERVICIO;

  constructor() {
    this.socket = io(this.url);
   }

  listen(eventemit: string) {
    return new Observable( (subcriber) => {
      this.socket.on(eventemit, (data) => {
        subcriber.next(data);
      });
    });
  }

  emit(eventemit: string, data: any) {
    this.socket.emit(eventemit, data);
  }
}
