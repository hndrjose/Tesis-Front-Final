import { Component, OnInit } from '@angular/core';
import { SocketsService } from './services/websocket/sockets.service';
import { ComentarioService } from './services/comentarios/comentario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tesisproj';

  constructor(
    public webSoket: SocketsService,
    public commentaioService: ComentarioService
  ) {}

  ngOnInit() {
  //   this.commentaioService.getMessage().subscribe( (msg) => {
  //      console.log(msg);
  //  });
    this.commentaioService.getMessagePrivate().subscribe( mgs => {
      console.log(mgs);
    });
  }
}
