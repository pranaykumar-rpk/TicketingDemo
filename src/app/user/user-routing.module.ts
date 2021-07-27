import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './home/user-home.component';
import { UserTicketsComponent } from './user-tickets/user-tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';


const routes: Routes = [
  {path: '', component:UserHomeComponent },
  {path: 'home', component:UserHomeComponent },
  {path: 'my-tickets', component: UserTicketsComponent  },
  {path: 'raise-ticket', component: NewTicketComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
