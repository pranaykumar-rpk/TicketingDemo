import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserTicketsComponent } from './user-tickets/user-tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';



@NgModule({
  declarations: [
    UserHomeComponent,
    UserTicketsComponent,
    NewTicketComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModuleModule { }
