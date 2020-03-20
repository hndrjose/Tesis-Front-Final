import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './page.component';
import { PAGES_ROUTES } from './pages.routin';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';


// Libreria de materiales
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatTreeModule, MatFormFieldModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';


// Paginas del APP
import { PerfilComponent } from './perfil/perfil.component';
import { DasboardComponent } from './dasboard/dasboard.component';


// Pipes
import { PipesModule } from '../pipes/pipes.module';
import { MainListaComponent } from './main-lista/main-lista.component';
import { PerfilproComponent } from './perfilpro/perfilpro.component';
import { HistorialpedidosComponent } from './historialpedidos/historialpedidos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AddpedidoComponent } from './addpedido/addpedido.component';
import { PreviousComponent } from './previous/previous.component';
import { UserchatComponent } from './userchat/userchat.component';
import { PerfilgaleryComponent } from './perfilgalery/perfilgalery.component';
import { ConfigaleryComponent } from './perfilgalery/configalery.component';




@NgModule({
  declarations: [PageComponent,
   SearchComponent,
   PerfilComponent,
   DasboardComponent,
   MainListaComponent,
   PerfilproComponent,
   HistorialpedidosComponent,
   PedidosComponent,
   AddpedidoComponent,
   PreviousComponent,
   UserchatComponent,
   PerfilgaleryComponent,
   ConfigaleryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    PAGES_ROUTES,
    SharedModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [PageComponent,
    DasboardComponent
  ]
})
export class PageModule { }
