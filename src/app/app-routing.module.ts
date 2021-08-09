import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './admin/employee-details/employee-details.component';
import { AuthComponent } from './auth/auth.component';
import { AdminGuardGuard } from './auth/guards/admin-guard.guard';
import { LoginGuard } from './auth/guards/login.guard';

const routes: Routes = [
  {
    path: 'user',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
  },
  {
    path: 'admin',
    canActivate: [AdminGuardGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: 'user' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
