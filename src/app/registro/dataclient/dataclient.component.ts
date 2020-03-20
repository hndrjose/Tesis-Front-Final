import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/usuario/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuarios.models';
import { Router } from '@angular/router';
import { DataPerfilService } from '../../services/dataPerfil/data-perfil.service';
import { ActivatedRoute } from '@angular/router';
import { DataPerfil } from '../../models/dataperfil.models';


@Component({
  selector: 'app-dataclient',
  templateUrl: './dataclient.component.html',
  styleUrls: ['./dataclient.component.css']

})
export class DataclientComponent implements OnInit {
  forma: FormGroup;
  usuario: Usuario = new Usuario('', '', '', '', '', '', '', '', '', );
  dataperfil: DataPerfil[] = [];
  user: string;
  iduser: number;

  constructor(public usuarioService: UserService, public router: Router, public dataPerfilService: DataPerfilService, 
    activatedRoute: ActivatedRoute ) {
    activatedRoute.params.subscribe(
      params => {
           let termino = params['user'];
         //  this.user = termino;
           this.usuarioService.cargarUsuarioUser(termino).subscribe( (resp: any) =>  this.usuario = resp);
           console.log('la id es: ' + this.usuario);
         //  this.cargarparametros(termino);
       });
   }

  ngOnInit() {
    this.forma = new FormGroup({
      competencias: new FormControl( null, Validators.required ),
      expLaboral: new FormControl( null, Validators.required ),
      conocimientos: new FormControl( null, Validators.required ),
    });
  }

  GuargarUser(  ) {

    let dataperfil = new DataPerfil(
      this.forma.value.competencias,
      this.forma.value.expLaboral,
      this.forma.value.conocimientos,
      this.usuario[0].Iduser,
    );

    console.log(dataperfil);

   // this.dataPerfilService.creardataPerfil( dataperfil ).subscribe ( resp => this.router.navigate(['/login']) );

  }

}
