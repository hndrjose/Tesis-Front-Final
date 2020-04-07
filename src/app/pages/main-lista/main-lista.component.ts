import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataPerfil } from '../../models/dataperfil.models';
import { DataPerfilService } from '../../services/service.index';
import { DataUser } from '../../models/data-user.models';
import { UserService } from '../../services/usuario/user.service';
import { Usuario } from '../../models/usuarios.models';
import { ActivatedRoute, Router } from '@angular/router' ;


@Component({
  selector: 'app-main-lista',
  templateUrl: './main-lista.component.html',
  styleUrls: ['./main-lista.component.css']
})
export class MainListaComponent implements OnInit {

idciudad: number;
termino: string;
ciudades: any;
data: DataUser;
data1: any;
user: Usuario;
page: number;
limit: number;
desde: number;
param: string;
opcion: string;
vopcion: string;
vocacion: string;
vvocacion: string;

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

    capturar( forma: NgForm  ) {
        this.vopcion = this.opcion;
        console.log(forma.value.opcion);
        console.log(this.termino);
    }
    cargarUser() {
      this.usuarioService.cargarUsuarios().subscribe( (resp: any) => this.user = resp );
      console.log(this.user);
     // console.log(this.termino);
    }

    cambiarDesde( valor: number ) {
      let page = this.page + valor;
      // if ( desde >= this.totalRegistros ) {
      //   return;
      // }
      if ( page < 0 ) {
        return;
      }
      this.page += valor;
      console.log(this.page);
    }


  cargarCiudad() {
    this.usuarioService.cargarCiudades().subscribe( (resp: any) => this.ciudades = resp );
    console.log(this.ciudades);
  }


  onSelect(ciudadId) {

    this.guardarStore(this.termino, ciudadId);

    this.router.navigate(['/mainLista', this.termino, ciudadId]);
    console.log('parametro es ' + this.termino );
    console.log('ID es ' + ciudadId);
   // this.dataPservice.cargarDataPerfil(this.termino, ciudadId).subscribe(  resp  => this.data = resp );
    // console.log(this.data);
  }

  guardarStore( termino: string, idciudad: string ) {
    this.dataPservice.guardarStorage(termino,  idciudad);
  }
}
