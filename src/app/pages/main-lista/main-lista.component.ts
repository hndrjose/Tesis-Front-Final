import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataPerfil } from '../../models/dataperfil.models';
import { DataPerfilService } from '../../services/service.index';
import { DataUser } from '../../models/data-user.models';
import { UserService } from '../../services/usuario/user.service';
import { Usuario } from '../../models/usuarios.models';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-main-lista',
  templateUrl: './main-lista.component.html',
  styleUrls: ['./main-lista.component.css']
})
export class MainListaComponent implements OnInit {

termino: any;
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

  constructor(public dataPservice: DataPerfilService, public usuarioService: UserService, public activatedRoute: ActivatedRoute) {
    this.page = 1;
    activatedRoute.params.subscribe(
      params => {
           this.termino = params['termino'];
           this.cargarparametros(this.termino);
       });
  }

  ngOnInit() {

  //  this.page = 1;

    // this.cargarUser();
    // console.log(this.user);
    //  this.cargarparametros();

  }

    cargarparametros(termino: string) {
      this.limit = 2;
      this.dataPservice.cargarDataPerfil(termino, this.page).subscribe( ( resp: any ) =>  {
        this.data = resp;
        console.log(this.data);
      });

    }
    cargarpordireccion(termino: string, forma: NgForm) {
      // this.limit = 2;
      // this.dataPservice.paramDataPerfil(termino, forma.value.opcion, this.page).subscribe( ( resp: any ) =>  {
      //   this.data = resp;
      //   console.log(this.data);
      // });
      console.log(forma.value.opcion);
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


}
