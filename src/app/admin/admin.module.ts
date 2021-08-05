import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MyNavBarComponent } from './my-nav-bar/my-nav-bar.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AdminMainComponent,
    MyNavBarComponent,
    EmployeeDetailsComponent,
    TicketsListComponent,
    EditTicketComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    AdminRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      preventDuplicates: true,
    }),
    FormsModule
  ],
  exports: [AdminMainComponent],
})
export class AdminModule {}
