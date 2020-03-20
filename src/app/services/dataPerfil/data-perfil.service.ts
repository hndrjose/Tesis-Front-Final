import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIO } from '../../config/config';

import { DataPerfil } from 'src/app/models/dataperfil.models';
import { Usuario } from 'src/app/models/usuarios.models';
import { Puntuacion } from '../../models/puntuacion.models';



import swal from 'sweetalert';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { SubirarchivoService } from '../subirarchivo/subirarchivo.service';


@Injectable({
  providedIn: 'root'
})
export class DataPerfilService {

  dataperfil: DataPerfil;
  verificar: string;

  constructor(public http: HttpClient, public router: Router) { }

  creardataPerfil( dataperfil: DataPerfil) {
    const url = URL_SERVICIO + '/addDataPerfil';

    return this.http.post( url, dataperfil)
    .map( (resp: any) => {
        swal('Perfil Acualizado', 'success');
        return resp;
       })
       .catch( err => {
        console.log( err.error.mensaje );
     //   swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw( err );
       });
  }


  actualizardataPerfil(dataperfil: DataPerfil,  usuario: Usuario) {

    let url = URL_SERVICIO + '/editarDataPerfil/' + usuario[0].Iduser;
    let verifica = Boolean;
    console.log('Del service ');
    console.log(dataperfil[0]);
    return this.http.put( url, dataperfil[0] )
                .map( (resp: any) => {
                 verifica = resp.ok;
                 if (verifica) {
                  console.log('Registro Acualizado');
                 }
                 swal('Registro actualizado', 'success' );
              });
  }

  cargarDataPerfil(termino: string, page: number) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/SelecDataLike/' + termino ; // +  '?page=' + page + '&limit=2'
    return this.http.post(url, '')
    .map( (resp: any) => resp.perfiles );

  }

  paramDataPerfil(termino: string, direccion: string, page: number) {  // termino: string, page: number, limit: number
    let url = URL_SERVICIO + '/SelecparamLike/' + termino ; // +  '?page=' + page + '&limit=2'
    return this.http.post(url, direccion)
    .map( (resp: any) => resp.perfiles );

  }

  crearpuntuacion( puntutacion: Puntuacion) {
    const url = URL_SERVICIO + '/crearpuntuacion/';

    return this.http.post(url, puntutacion)
    .map( (resp: any) =>
        // console.log('Datos de puntaje creados');
        resp.resultado
       );
  }

  sumarPuntuacion( puntuacion: string,  usuario: Usuario) {
    const url = URL_SERVICIO + '/addpuntuacion/' + usuario.Iduser;

    return this.http.post(url, puntuacion)
    .map( (resp: any) => {
        console.log('Puntuacion Actualizada');
        return resp;
       })
       .catch( err => {
        console.log( err.error.mensaje );
     //   swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw( err );
       });
  }

  calcularScore( usuario: Usuario) {
    const url = URL_SERVICIO + '/calscore';

    return this.http.post(url, usuario)
    .map( (resp: any) => {
        console.log('Score Acutalizado');
        return resp;
       })
       .catch( err => {
        console.log( err.error.mensaje );
     //   swal(err.error.mensaje, err.error.errors.message, 'error');
        return Observable.throw( err );
       });
  }

  cargarPuntuacion( Id: number ) {  // termino: string, page: number, limit: number
    console.log(Id);
    let url = URL_SERVICIO + '/buscar/' + Id;
    return this.http.get(url)
    .map( (resp: any) => resp.puntuacion );

  }

  cargargaleria( Id: number ) {  // termino: string, page: number, limit: number
    console.log(Id);
    let url = URL_SERVICIO + '/datagaleria/' + Id;
    return this.http.get(url)
    .map( (resp: any) => resp.usuarios );

  }


  borrarimggaleria( id: string ) {

    let url = URL_SERVICIO + '/ElimArchivo/' + id;

    return this.http.delete( url )
                .map( resp => {
               //   swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                });

  }

  borrarimgarchivo( img: string ) {

    let url = URL_SERVICIO + '/ElimImg/' + img;

    return this.http.delete( url )
                .map( resp => {
               //   swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                });

  }

 // URL_SERVICIO + `/dataperfil/SelecDataLike/${termino}?page=${page}&limit=${limit}`;
}
