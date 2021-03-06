import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/usuario/user.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Usuario } from '../models/usuarios.models';
import { Router } from '@angular/router';
import { SocketsService } from '../services/websocket/sockets.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma: FormGroup;
  usuario: Usuario[] = [];
  email: string;
  recuerdame: boolean = false;
  validar: boolean;

  constructor(public usuarioService: UserService, public router: Router,
    public socketsService: SocketsService ) { }

  ngOnInit() {
    this.email =  localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  ingresar( forma: NgForm ) {
    const usuario = new Usuario(forma.value.user, forma.value.password, null);

    this.socketsService.LoginWs(forma.value.user)
    .then( () => {
      this.usuarioService.LogearUsuario(usuario).subscribe(correto =>  this.router.navigate(['/dasboard']));
    });
  }




}
