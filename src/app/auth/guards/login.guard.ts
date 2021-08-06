import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.afAuth.authState.pipe(
      map((user) => {
        if (user) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      }),
      take(1)
    );
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   | Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean
  //   | UrlTree {
  //   console.log('Called Can Activate');
  //   if (this.authService.isUserLoggedIn) {
  //     console.log('Navigating to home');
  //     this.router.navigate(['home']);
  //     return true;
  //   } else {
  //     return this.afAuth.authState.pipe(
  //       map((user) => {
  //         if (user) {
  //           console.log('User logged in');
  //           this.authService.isUserLoggedIn = true;
  //           this.authService.user = user;
  //           return true;
  //         } else {
  //           console.log('No User logged in');
  //           this.authService.isUserLoggedIn = false;
  //           this.authService.user = undefined;
  //           this.router.navigate(['auth']);
  //           return false;
  //         }
  //       })
  //     );
  //   }
  // }
}
