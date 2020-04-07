import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './pages/page.component';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Login/register.component';
import { DecisionComponent } from './Login/decision.component';
import { GuardsGuard } from './services/service.index';
import { EntradaComponent } from './entrada/entrada.component';
import { DataclientComponent } from './registro/dataclient/dataclient.component';
import { DataproveeComponent } from './registro/dataprovee/dataprovee.component';
import { MainListaComponent } from './pages/main-lista/main-lista.component';
import { ListaproveeComponent } from './entrada/listaprovee.component';



const appRoutes: Routes = [
  { path: 'home', component: EntradaComponent},
  { path: 'regclient/:user', component: DataclientComponent},
  { path: 'regprovee/:user', component: DataproveeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register/:termino', component: RegisterComponent },
  { path: 'decision', component: DecisionComponent },
  { path: 'listprovee/:termino/:idciudad', component: ListaproveeComponent }
  //  {
  //      path: '',
  //      component: PageComponent,
  //      canActivate: [ GuardsGuard ],
  //  },
//  { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
