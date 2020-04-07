import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuarios.models';
import { Router } from '@angular/router' ;
import { MainListaComponent } from '../../pages/main-lista/main-lista.component';
import { PedidosService } from '../../services/pedidos/pedidos.service';





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  verifica: string;
  role: string;
  pedidotem: any[];
  constructor( public usuarioService: UserService, public router: Router, public pedidoServices: PedidosService ) {
        this.usuario = usuarioService.usuario;
        this.role = this.usuario[0].role;
    }

  ngOnInit() {
    this.cargarAlertapedido();
  }


  salir() {
    this.usuarioService.logout();
  }

  onkeypress(termino: string) {
    this.router.navigate(['/mainLista', termino, this.usuario[0].Iduser]);
  }

  cargarAlertapedido() {
    let termino = this.usuario[0].Iduser;
    this.pedidoServices.cargarPedPenTempo(termino).subscribe(respuesta => this.pedidotem = respuesta);
  }
}
