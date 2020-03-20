import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';
import { SearchComponent } from './search/search.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { MainListaComponent } from './main-lista/main-lista.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AddpedidoComponent } from './addpedido/addpedido.component';
import { PerfilproComponent } from './perfilpro/perfilpro.component';
import { PreviousComponent } from './previous/previous.component';
import { GuardsGuard } from '../services/guards/guards.guard';
import { HistorialpedidosComponent } from './historialpedidos/historialpedidos.component';
import { UserchatComponent } from './userchat/userchat.component';
import { PerfilgaleryComponent } from './perfilgalery/perfilgalery.component';
import { ConfigaleryComponent } from './perfilgalery/configalery.component';




const pagesRouter: Routes = [
    {
        path: '',
        component: PageComponent,
        canActivate: [ GuardsGuard ],
        children: [
           { path: 'dasboard', component: DasboardComponent },
           { path: 'search', component: SearchComponent },
           { path: 'perfil', component: PerfilComponent},
           { path: 'perfilpro', component: PerfilproComponent},
           { path: 'pedidos/:termino', component: PedidosComponent},
           { path: 'userchat/:iduser/:idpedido/:iduserpro', component: UserchatComponent},
           { path: 'mainLista/:termino', component: MainListaComponent},
           { path: 'addpedidos/:termino', component: AddpedidoComponent},
           { path: 'previous/:termino', component: PreviousComponent},
           { path: 'vpedidos', component: HistorialpedidosComponent},
           { path: 'galeria', component: PerfilgaleryComponent},
           { path: 'cgaleria', component: ConfigaleryComponent},
           { path: '', redirectTo: '/dasboard', pathMatch: 'full' }
      ]
   }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRouter );
