import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginGuard } from './auth/guards/login.guard';
import { User } from './models/user';
import { UserHomeComponent } from './user/home/user-home.component';

const routes: Routes = [
  {
    path: 'user',
    canActivate:[LoginGuard],
    loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
  },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: 'user' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
