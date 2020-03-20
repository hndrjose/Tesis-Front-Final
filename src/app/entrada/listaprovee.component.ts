import { Component, OnInit } from '@angular/core';
import { DataPerfilService } from '../services/dataPerfil/data-perfil.service';
import { DataUser } from '../models/data-user.models';
import { UserService } from '../services/usuario/user.service';

import { Usuario } from '../models/usuarios.models';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-listaprovee',
  templateUrl: './listaprovee.component.html',
  styleUrls: ['./listaprovee.component.css']
})
export class ListaproveeComponent implements OnInit {

data: any;
data1: any;
user: Usuario;
page: number;
limit: number;
desde: number;
param: string;

  constructor(public dataPservice: DataPerfilService, public usuarioService: UserService, public activatedRoute: ActivatedRoute) {
    this.page = 1;
    activatedRoute.params.subscribe(
      params => {
           let termino = params['termino'];
           this.cargarparametros(termino);
           console.log(this.data);
       });
   }

  ngOnInit() {
  }

  cargarparametros(termino: string) {
    this.limit = 2;
    this.dataPservice.cargarDataPerfil(termino, this.page).subscribe(  resp  => this.data = resp );

  }
}
