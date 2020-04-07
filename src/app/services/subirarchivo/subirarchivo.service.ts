import { Injectable } from '@angular/core';
import { URL_SERVICIO } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirarchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {
    return new Promise( (resolve, reject ) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append( 'imge', archivo, archivo.name );
      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            console.log( JSON.parse( xhr.response ) );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };
      let url = URL_SERVICIO + '/imagenes/' + id;
      xhr.open('PUT', url, true );
      xhr.send( formData );
    });

  }

  subirArchivo2( archivo: File, tipo: string, id: string) {
    return new Promise( (resolve, reject ) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append( 'img', archivo, archivo.name );
      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            console.log( JSON.parse( xhr.response ) );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };
      let url = URL_SERVICIO + '/imggaleria/' + id;
      xhr.open('PUT', url, true );
      xhr.send( formData );
    });

  }
}
