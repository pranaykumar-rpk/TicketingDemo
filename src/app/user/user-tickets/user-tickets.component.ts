import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css'],
})
export class UserTicketsComponent implements OnInit {
  displayedColumns: string[] = [
    'raisedBy',
    'ticketId',
    'loggedDate',
    'description',
    'status',
    'assignedTo',
    'type',
    'item',
    'category',
    'resolvedDate',
    'solution',
  ];

  dataSource!: MatTableDataSource<any>;
  array: Ticket[] = [];
  usersList: any[] = [];
  constructor(private firestore: AngularFirestore) {}
  ngOnInit() {
    // this.firestore
    //   .collection('tickets')
    //   .ref.where('raisedBy', '==', '1797150')
    //   .get()
    //   .then((docs) => {
    //     docs.forEach((documentSnaphot) => {
    //       console.log('Document Snapshot', documentSnaphot.data());
    //       this.array.push(documentSnaphot.data() as Ticket);
    //     });
    //     this.dataSource = new MatTableDataSource(this.array);
    //   })
    //   .catch((err) => {
    //     console.log('Error while loading documents: ', err);
    //   });
    // this.firestore

    this.firestore
      .collection('tickets', (ref) => ref.where('raisedBy', '==', '1797150'))
      .valueChanges()
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  getDate(seconds?: number) {
    var d = new Date(0);
    d.setUTCMilliseconds(seconds == undefined ? 0 : seconds);
    return d.toLocaleDateString();
  }

  getStatus(status?: number) {
    if (status == 0) {
      return 'OPENED';
    } else if (status == 1) {
      return 'CLOSED';
    } else {
      return 'REOPEN';
    }
  }
}
