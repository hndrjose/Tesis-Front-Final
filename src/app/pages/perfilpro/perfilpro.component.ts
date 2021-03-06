import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuarios.models';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-perfilpro',
  templateUrl: './perfilpro.component.html',
  styleUrls: ['./perfilpro.component.css']
})
export class PerfilproComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '', '', '', '', 0, '', '', '', );
  forma: FormGroup;
  imagenSubir: File;
  imagenTemp: any;
  verifica: any;


  constructor(public usuarioService: UserService) { 
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {
    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
    });
  }

  guardarDatos( f: NgForm ) {
    this.usuarioService.actualizarUsuario(this.usuario).subscribe();
  //  console.log( this.usuario );
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
    this.usuarioService.cambiarImagen( this.imagenSubir, this.usuario[0].Iduser );
   // this.usuarioService.cargarUsuario( this.usuario[0].Iduser ).subscribe();
  }

}
