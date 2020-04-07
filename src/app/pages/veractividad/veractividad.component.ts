import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/usuario/user.service';
import { Usuario } from '../../models/usuarios.models';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { Pedido } from '../../models/pedido.models';

@Component({
  selector: 'app-veractividad',
  templateUrl: './veractividad.component.html',
  styleUrls: ['./veractividad.component.css']
})
export class VeractividadComponent implements OnInit {

idchek: any[] = [];
user: Usuario;
userpro: string;
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
      this.role = this.user[0].role;
      activatedRoute.params.subscribe(
        //  iduserpro/:iduser
        params => {
             let termino = params['iduserpro'];
             this.userpro = params['iduserpro'];
             this.cargarActividadUser(termino);
             this.cargarActividad(termino, this.user[0].Iduser);
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
