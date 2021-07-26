import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './home/user-home.component';
import { UserTicketsComponent } from './user-tickets/user-tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { MyNavBarComponent } from './my-nav-bar/my-nav-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    UserHomeComponent,
    UserTicketsComponent,
    NewTicketComponent,
    MyNavBarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports:[
    UserHomeComponent,
  ]
})
export class UserModule { }
