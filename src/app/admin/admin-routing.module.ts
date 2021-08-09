import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';

const routes: Routes = [
  { path: '', component: EmployeeDetailsComponent },
  { path: 'console', component: EmployeeDetailsComponent },
  { path: 'tickets-list', component: TicketsListComponent },
  { path: '**', redirectTo: 'console' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
