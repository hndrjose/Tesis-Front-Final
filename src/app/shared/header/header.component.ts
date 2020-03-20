import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuarios.models';
import { Router } from '@angular/router' ;
import { MainListaComponent } from '../../pages/main-lista/main-lista.component';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  verifica: string;
  role: string;
  constructor( public usuarioService: UserService, public router: Router ) { // public mainLista: MainListaComponent
    // this.verifica = localStorage.getItem('ok');
    // if (!this.verifica) {
      //   return;
      // } else {
        this.usuario = usuarioService.usuario;
        this.role = this.usuario[0].role;
    // }
   }

  ngOnInit() {
  }


  salir() {
    this.usuarioService.logout();
  }

  onkeypress(termino: string) {
    this.router.navigate(['/mainLista', termino]);
  }
}
