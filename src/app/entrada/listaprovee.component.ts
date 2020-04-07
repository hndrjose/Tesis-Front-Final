import { Component, OnInit } from '@angular/core';
import { DataPerfilService } from '../services/dataPerfil/data-perfil.service';
import { DataUser } from '../models/data-user.models';
import { UserService } from '../services/usuario/user.service';
import { ActivatedRoute, Router } from '@angular/router' ;

import { Usuario } from '../models/usuarios.models';


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
ciudades: any;
idciudad: number;
termino: string;

  constructor(public dataPservice: DataPerfilService, public usuarioService: UserService, public activatedRoute: ActivatedRoute
    , public router: Router) {
    this.page = 1;
    this.termino = this.dataPservice.termino;
    this.idciudad = parseInt(this.dataPservice.idciudad, 10);



    activatedRoute.params.subscribe(
      params => {
           let ter = params['termino'];
           let id = params['idciudad']
           this.termino = ter;
           this.idciudad = id;
           this.guardarStore(ter, id.toString());
           this.cargarparametros(this.termino, this.idciudad);
           console.log(this.data);
       });
   }

  ngOnInit() {
    this.cargarCiudad();
  }

  cargarparametros(termino: string, idciudad: number) {
    this.limit = 2;
    this.dataPservice.cargarDataPerfil(termino, idciudad).subscribe(  resp  => this.data = resp );
  }

  cargarCiudad() {
    this.usuarioService.cargarCiudades().subscribe( (resp: any) => this.ciudades = resp );
    console.log(this.ciudades);
  }

  onSelect(ciudadId) {

    this.guardarStore(this.termino, ciudadId);

    this.router.navigate(['/listprovee', this.termino, ciudadId]);
    console.log('parametro es ' + this.termino );
    console.log('ID es ' + ciudadId);
   // this.dataPservice.cargarDataPerfil(this.termino, ciudadId).subscribe(  resp  => this.data = resp );
    // console.log(this.data);
  }

  guardarStore( termino: string, idciudad: string ) {
    this.dataPservice.guardarStorage(termino,  idciudad);
  }

}
