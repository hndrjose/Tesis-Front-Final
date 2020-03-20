import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;

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
    this.router.navigate(['/listprovee', termino]);
  }


}
