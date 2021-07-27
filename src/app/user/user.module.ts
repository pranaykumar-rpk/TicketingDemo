import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './home/user-home.component';
import { UserTicketsComponent } from './user-tickets/user-tickets.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { MyNavBarComponent } from './my-nav-bar/my-nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserRoutingModule } from './user-routing.module';
import { MainComponentComponent } from './main-component/main-component.component';

@NgModule({
  declarations: [
    UserHomeComponent,
    UserTicketsComponent,
    NewTicketComponent,
    MyNavBarComponent,
    MainComponentComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    UserRoutingModule
  ],
  exports:[
    UserHomeComponent,
    MainComponentComponent
  ]
})
export class UserModule { }
