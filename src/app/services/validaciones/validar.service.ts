import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIO } from '../../config/config';

import { DatosEmail } from '../../models/datos.models';

import swal from 'sweetalert';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class ValidarService {
  verificar: string;
  logeo: string;
  constructor(public http: HttpClient, public router: Router) { }


  generarRandon( ) {
    let url = URL_SERVICIO + '/randon';
    return this.http.get( url )
              .map( (resp: any ) => {
                return resp.randon;
              });
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
