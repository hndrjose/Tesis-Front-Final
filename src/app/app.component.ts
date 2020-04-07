import { Component, OnInit } from '@angular/core';
import { SocketsService } from './services/websocket/sockets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tesisproj';

  constructor(
    public webSoket: SocketsService
  ) {}

  ngOnInit() {}
}
