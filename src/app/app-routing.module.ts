import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
    {path:"user",loadChildren:()=> import('./user/user.module').then(mod=>mod.UserModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
