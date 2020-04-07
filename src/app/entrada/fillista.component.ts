import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router' ;
import { UserService } from '../services/usuario/user.service';


@Component({
  selector: 'app-fillista',
  templateUrl: './fillista.component.html',
  styleUrls: ['./fillista.component.css']
})
export class FillistaComponent implements OnInit {

  idciudad: number;
  public termino: string;
  ciudades: any;

  constructor(public router: Router,  public usuarioService: UserService) { }

  ngOnInit() {
    this.cargarCiudad();
  }

  cargarCiudad() {
    this.usuarioService.cargarCiudades().subscribe( (resp: any) => this.ciudades = resp );
    console.log(this.ciudades);
  }


  onSelect(ciudadId) {

    console.log(ciudadId);

    this.idciudad = ciudadId;

    this.router.navigate(['/listprovee', this.termino, this.idciudad]);
   // this.dataPservice.cargarDataPerfil(this.termino, ciudadId).subscribe(  resp  => this.data = resp );
    }

}
