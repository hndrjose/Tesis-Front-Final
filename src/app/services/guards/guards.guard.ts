import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../usuario/user.service';


@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate  {

  constructor(
    public usuarioService: UserService,
    public router: Router
  ) {}

  canActivate() {
    if ( this.usuarioService.estaLogueado() ) {
      console.log('logeado');
      return true;
    } else {
      console.log( 'Bloqueado por guard' );
      this.router.navigate(['/home']);
      return false;
    }
  }

}
