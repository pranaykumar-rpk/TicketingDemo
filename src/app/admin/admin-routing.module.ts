import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';

const routes: Routes = [
  {path: 'admin', component: AdminMainComponent },
  {path: 'employee-details', component: EmployeeDetailsComponent },
  {path: 'tickets-list', component: TicketsListComponent },
  {path: 'edit-ticket', component: EditTicketComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
