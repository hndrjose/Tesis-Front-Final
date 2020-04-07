import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/usuario/user.service';
import { Usuario } from '../../models/usuarios.models';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { Pedido } from '../../models/pedido.models';

@Component({
  selector: 'app-crearactividad',
  templateUrl: './crearactividad.component.html',
  styleUrls: ['./crearactividad.component.css']
})
export class CrearactividadComponent implements OnInit {

idchek: any[] = [];
user: Usuario;
page: number;
limit: number;
desde: number;
param: string;
pedido: any;
actividad2: any;
role: string;

  constructor(public usuarioService: UserService, public activatedRoute: ActivatedRoute,
    public pedidoService: PedidosService) {
      this.user = usuarioService.usuario;
      console.log(this.user[0].role);
      this.role = this.user[0].role;
      activatedRoute.params.subscribe(
        params => {
             let termino = params['termino'];
             if (this.user[0].role === 'USER' ) {
               this.cargarActividad(termino, this.user[0].Iduser);
             }
             if (this.user[0].role === 'PROV') {
               this.cargarActividad(this.user[0].Iduser, 0);
               this.cargarActividadUser(this.user[0].Iduser);
             }

         });
    }

  ngOnInit() {
  }

  cargarActividad(Iduser: number, Idusuario: number) {
    console.log('el parametro es:' + Iduser);
    this.pedidoService.cargarActividades(Iduser, Idusuario).subscribe( ( resp: any ) =>  {
      this.pedido = resp;
    });
   }


  cargarActividadUser(Iduser: number) {
    console.log('el parametro es:' + Iduser);
    this.pedidoService.cargarActividadesUser(Iduser).subscribe( ( resp: any ) =>  {
      this.actividad2 = resp;
    });
   }

  enviar(pos: number, Id: number ) {
      this.idchek[pos] = Id;
      console.log(this.idchek);
  }



}
