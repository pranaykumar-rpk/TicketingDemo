import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.css'],
})
export class TicketsListComponent implements OnInit {
  displayedColumns: string[] = [
    'ticketId',
    'item',
    'description',
    'status',
    'loggedDate',
    'resolvedDate',
    'raisedBy',
    'assignedTo',
    'category',
    'type',
    'solution',
    'edit',
  ];

  dataSource!: MatTableDataSource<any>;
  constructor(private firestore: AngularFirestore, public dialog: MatDialog) {}
  ngOnInit() {
    this.firestore
      .collection('tickets')
      .valueChanges()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  openDialog(d: any): void {
    console.log("dialog open");
    const dialogRef = this.dialog.open(EditTicketComponent, {
      width: '350px',
      disableClose: true,
      data: {
        solution: d.solution,
        status: d.status,
        resolvedDate: d.resolvedDate,
        ticketId: d.ticketId
      },
    });
  }

  getStatus(status?: number) {
    if (status == 1) {
      return 'OPENED';
    } else if (status == 2) {
      return 'CLOSED';
    } else {
      return 'REOPEN';
    }
  }
}
