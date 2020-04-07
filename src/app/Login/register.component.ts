import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/usuario/user.service';
import { ValidarService } from '../services/validaciones/validar.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../models/usuarios.models';
import { DatosEmail } from '../models/datos.models';


import { Router, ActivatedRoute  } from '@angular/router';
import { PedidosService } from '../services/service.index';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;
  usuario: Usuario[] = [];
  role: string;
  emails: string;
  asunto: string;
//  selectciudades = new Ciudad('', '', );
  ciudades: any;
  idciudad: number;

  // forma = new  FormGroup({
  //   user : new FormControl(''),
  //   email : new FormControl(''),
  //   password : new FormControl(''),
  //   password2 : new FormControl('')
  // });


  constructor( public usuarioService: UserService, public router: Router, public activatedRoute: ActivatedRoute,
    public validarService: ValidarService, public pedidoService: PedidosService ) {
    activatedRoute.params.subscribe(
      params => {
           let termino = params['termino'];
           this.role = termino;
       });
   }

  ngOnInit() {
    this.forma = new FormGroup({
      user: new FormControl( null, Validators.required ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      email: new FormControl( null, Validators.required ),
      nombre: new FormControl( null, Validators.required ),
      direccion: new FormControl( null, Validators.required ),
    });
    this.cargarCiudad();
  }


  GuargarUser(  ) {

    let usuario = new Usuario(
      this.forma.value.user,
      this.forma.value.password,
      this.forma.value.email,
      this.forma.value.nombre,
      this.forma.value.direccion,
      this.role,
      this.idciudad
    );

    this.emails = 'jose2010men@hotmail.com';
    this.asunto = 'Bienvenido';
    let mensj = 'Bienvenido: ' + usuario.user;

    let data = new DatosEmail(
      usuario.email,
      usuario.nombre,
      this.asunto,
      this.emails,
      mensj
    );


    if ( this.forma.value.password === this.forma.value.password2 ) {
      console.log(usuario);
      if (this.role === 'USER') {
        this.usuarioService.crearUsuario( usuario ).subscribe( resp => this.router.navigate(['/login']));
        this.usuarioService.enviarEmail(data).subscribe();
        console.log(data);
      }
      this.usuarioService.crearUsuario( usuario ).subscribe( resp => this.router.navigate(['/regprovee/' + usuario.user]));
      this.usuarioService.enviarEmail(data).subscribe();
    } else {
      console.log('password incorreto');
    }
  }

  cargarCiudad() {
    this.usuarioService.cargarCiudades().subscribe( (resp: any) => this.ciudades = resp );
    console.log(this.ciudades);
  }

  onSelect(ciudadId) {

    console.log(ciudadId);

    this.idciudad = ciudadId;

    }


}
