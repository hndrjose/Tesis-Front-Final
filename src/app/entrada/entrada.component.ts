import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router' ;
import { FillistaComponent } from './fillista.component';



@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {


  constructor(public router: Router) { }

 ngOnInit() {
 }

  onkeypress(termino: string) {
    this.router.navigate(['/listprovee', termino, 1]);
   }


}
