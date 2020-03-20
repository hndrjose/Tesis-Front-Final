import { Component, OnInit } from '@angular/core';
import { DataPerfilService } from '../../services/service.index';
import { DataUser } from '../../models/data-user.models';
import { UserService } from '../../services/usuario/user.service';
import { Usuario } from '../../models/usuarios.models';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';



@Component({
  selector: 'app-configalery',
  templateUrl: './configalery.component.html',
  styleUrls: ['./configalery.component.css']
})
export class ConfigaleryComponent implements OnInit {

fecha = new Date();
fecha2 = this.fecha.getDate() + '/' + (this.fecha.getMonth() + 1) + '/' + this.fecha.getFullYear();
data: DataUser;
data1: any;
user: Usuario;
page: number;
limit: number;
desde: number;
param: string;
usuario: Usuario;
imagenSubir: File;
imagenTemp: any;
verifica: any;
galeria: any;
nomimg: any[] = [];

forma: FormGroup;


  constructor(public dataperfil: DataPerfilService, public usuarioService: UserService, public activatedRoute: ActivatedRoute) {
    // activatedRoute.params.subscribe(
    //   params => {
    //        let termino = params['termino'];
    //        this.cargarparametros(termino);
    //    });
       this.usuario = this.usuarioService.usuario;
   }

  ngOnInit() {
    this.cargarGaleria();
  }

  cargarGaleria() {

    this.dataperfil.cargargaleria(this.usuario[0].Iduser).subscribe( usuarios => this.galeria = usuarios );
  }




  seleccionImage( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ) {
    //  swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
   // console.log(this.imagenSubir);
    this.usuarioService.adgalery( this.imagenSubir, this.usuario[0].Iduser );
    // console.log(this.fecha2);
  }


  EliminarImg(i: number) {
   this.dataperfil.borrarimggaleria(this.galeria[i].Idgaleria).subscribe();
   this.dataperfil.borrarimgarchivo(this.galeria[i].archivo).subscribe();
   this.cargarGaleria();
  }



}
