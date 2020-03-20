import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/usuario/user.service';
import { Usuario } from '../../models/usuarios.models';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { Pedido } from '../../models/pedido.models';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

user: Usuario;
page: number;
limit: number;
desde: number;
param: string;
pedido: Pedido;


  constructor(public usuarioService: UserService, public activatedRoute: ActivatedRoute,
    public pedidoService: PedidosService) {
      this.user = usuarioService.usuario;
      console.log(this.user[0].role);
      activatedRoute.params.subscribe(
        params => {
             let termino = params['termino'];
             if (this.user[0].role === 'USER' ) {
               this.cargarparametros(this.user[0].Iduser);
             }
             if (this.user[0].role === 'PROV') {
               this.cargarparametrospro(termino);
             }

         });
     }

  ngOnInit() {
  }

  cargarparametros(termino: string) {
    console.log('el parametro es:' + termino);
    this.pedidoService.cargarPedidoPerfil(termino).subscribe( ( resp: any ) =>  {
      this.pedido = resp;
    });
   }

  cargarparametrospro(termino: string) {
    console.log('el parametro es:' + termino);
    this.pedidoService.cargarPedidoPerfilProv(termino).subscribe( ( resp: any ) =>  {
      this.pedido = resp;
    });
  }
}
