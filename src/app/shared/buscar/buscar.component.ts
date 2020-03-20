import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  valor: string;
  constructor() { }

  ngOnInit() {
  }


  onkeypress(event: any) {
    console.log(event);
  }
}
