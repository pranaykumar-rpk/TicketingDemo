import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    console.log('Called Admin guard');
    return this.afAuth.authState.pipe(
      map((user) => {
        if (user) {
          if (user.email == 'admin@ticketingsystem.com') {
            console.log('Moving to admin console');
            this.router.createUrlTree(['console']);
            return true;
          } else {
            console.log('Moving to Auth screen');
            this.router.createUrlTree(['/auth']);
            return false;
          }
        }
        return this.router.createUrlTree(['/auth']);
      }),
      take(1)
    );
  }
}
