import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/usuario/user.service';
import { Usuario } from '../../models/usuarios.models';
import { PedidosService } from '../../services/pedidos/pedidos.service';
import { Pedido } from '../../models/pedido.models';
import { Activades } from '../../models/actividades.models';

@Component({
  selector: 'app-adactividad',
  templateUrl: './adactividad.component.html',
  styleUrls: ['./adactividad.component.css']
})
export class AdactividadComponent implements OnInit {

  fecha = new Date();
  fecha2 = this.fecha.getFullYear() + '-' + (this.fecha.getMonth() + 1) + '-' +  this.fecha.getDate();
  Hora = this.fecha.getHours() + ':' + this.fecha.getMinutes();
  usuario: Usuario;
  pedido: Activades;
  deactividad: any;
  termino: number;
  Idusuario: number;
  Iduser: number;
  Idactividadd: number;
  rutaapp: string;


  constructor(public router: Router, public pedidoService: PedidosService,
    public usuarioService: UserService, public activatedRoute: ActivatedRoute ) {
      this.usuario = this.usuarioService.usuario;

      activatedRoute.params.subscribe(
        params => {
             this.termino = params['termino'];
             let tipo = params['tipo'];

             if ( tipo === 'ad' ) {
                this.cargarActividad(this.termino);
                console.log('Se va a adicionar nueva actividad');
              } else if ( tipo === 'Mod' ) {
                this.cargarActividad(this.termino);

                // console.log('El Cliente es ' + this.Idusuario);
             }


             if (this.usuario[0].role === 'PROV') {
              this.Idusuario = 0;
              } else {
              this.Idusuario = this.usuario[0].Iduser;
              this.Iduser = params['termino2'];
              }


         });
     }

  ngOnInit() {

  }

  cargarActividad(Id: number) {
    console.log('el parametro es:' + Id);
    this.pedidoService.cargarActividadID(Id).subscribe( ( resp: any ) =>  {
      this.deactividad = resp;
    });
   }

   guardarDatos(f: NgForm) {



    if (this.usuario[0].role === 'PROV') {
      const actividad = new Activades(f.value.nombre, f.value.descripcion, this.fecha2, f.value.precio, f.value.direccion,
        this.usuario[0].Iduser, this.Idusuario);
      this.pedidoService.crearActividad(actividad).subscribe(resp => this.router.navigate(['/listactividad/' + this.usuario.Iduser]));
    } else {
      const actividad = new Activades(f.value.nombre, f.value.descripcion, this.fecha2, f.value.precio, f.value.direccion,
      this.Iduser, this.Idusuario);
      this.pedidoService.crearActividad(actividad).subscribe(resp => this.router.navigate([ '/veractividad/' + this.Iduser +
      '/' + this.Idusuario]));
      console.log(actividad);
    }

   }
}
