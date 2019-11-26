import {AuthService} from '../auth/auth.service';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roles = this.authService.getRoles();
    if (!roles.toString().includes(next.data.allowedRoles)) {
      debugger
      //opresc accesul la paginile de EDIT , ADD ETC in functie de rol
      console.log('NU ARE DREPTUL');
      this.router.navigate(['']);
      return false;
    }
    console.log('ARE DREPTUL');
    return true;
  }
}
