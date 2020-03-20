import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuarios.models';
import { UserService } from '../../services/service.index';
import { DataPerfilService } from '../../services/dataPerfil/data-perfil.service';


@Component({
  selector: 'app-perfilgalery',
  templateUrl: './perfilgalery.component.html',
  styleUrls: ['./perfilgalery.component.css']
})
export class PerfilgaleryComponent implements OnInit {

  usuario: Usuario;
  forma: FormGroup;
  imagenSubir: File;
  imagenTemp: any;
  verifica: any;
  galeria: any;
  nomimg: any[] = [];

  constructor(public usuarioService: UserService, public dataperfil: DataPerfilService) {
    this.usuario = this.usuarioService.usuario;
   }

  ngOnInit() {
   this.cargarGaleria(this.usuario[0].Iduser);
   console.log(this.usuario[0].Iduser);

   this.forma = new FormGroup({
    img: new FormControl( null, Validators.required ),
   });
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
   // this.usuarioService.cargarUsuario( this.usuario[0].Iduser ).subscribe();
  }

  cargarGaleria( Id: number ) {
    this.dataperfil.cargargaleria(Id).subscribe( usuarios => this.galeria = usuarios );
  }

  EliminarImg() {
   this.nomimg = this.forma.value.img;
   console.log( this.nomimg);
  }

}
