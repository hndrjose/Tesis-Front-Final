import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuarios.models';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = new Usuario('', '', '', '', '', '', '', '', '', );
  forma: FormGroup;
  imagenSubir: File;
  imagenTemp: any;
  verifica: any;


  constructor(public usuarioService: UserService) {
    this.usuario = this.usuarioService.usuario;
   }

  ngOnInit() {
    console.log( this.usuario[0].user);
  }

  guardarDatos( f: NgForm ) {
    let pass1 = f.value.password;
    let pass2 = f.value.password2;
    const user = new Usuario(this.usuario[0].user, f.value.password, this.usuario[0].email, f.value.nombre, f.value.direccion,
      f.value.telefono, f.value.vocacion, this.usuario[0].img, this.usuario[0].role, this.usuario[0].Iduser);
    console.log(pass1);

    console.log(user);
    this.usuarioService.actualizarUsuario(user).subscribe();
    // console.log( this.usuario );


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
