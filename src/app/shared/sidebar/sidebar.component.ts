import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuarios.models';
import { UserService, DataPerfilService, PedidosService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  pendiente: any[] = [];
  role: string;
  constructor(public usuarioService: UserService, public dataperfilService: DataPerfilService,
    public pedidoService: PedidosService) {
      this.usuario = this.usuarioService.usuario;
      this.role = this.usuario[0].role;
    }

  ngOnInit() {
   this.cargarPedidoPendiente();
  }



  cargarPedidoPendiente() {
    let termino = this.usuario[0].Iduser;
    let tipo = this.usuario[0].role;
    if ( tipo === 'USER' ) {
       console.log('Es Usuario');
    } else {
    //  this.pedidoService.cargarPedPendientes( termino ).subscribe( terminados => this.pendiente = terminados );
    }
  }


}
