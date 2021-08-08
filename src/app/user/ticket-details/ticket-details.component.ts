import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ticket } from 'src/app/models/ticket';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileServiceService } from '../profile-service.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
})
export class TicketDetailsComponent implements OnInit {
  selectedTicket?: Ticket = {};
  array: Ticket[] = [];
  totalTickets?: number = 0;
  openedTickets?: number = 0;
  closedTickets?: number = 0;
  reopnedTickets?: number = 0;

  constructor(
    private firestore: AngularFirestore,
    private profileService: ProfileServiceService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  onSelect(selected: Ticket) {
    console.log('Called on select method');
    this.selectedTicket = selected;
  }

  loadData() {
    this.firestore
      .collection('tickets', (ref) =>
        ref
          .where('raisedBy', '==', this.profileService.getuserData()?.emailId)
          .orderBy('loggedDate', 'desc')
      )
      .valueChanges()
      .subscribe((data) => {
        this.array = data as Ticket[];
        if (
          this.selectedTicket == undefined ||
          this.selectedTicket == null ||
          this.selectedTicket.ticketId == undefined ||
          this.selectedTicket.ticketId == null
        ) {
          console.log('Called On Init method first time');
          this.selectedTicket = this.array[0];
        }
        this.updateDetails();
      });
  }

  updateDetails() {
    this.totalTickets = this.array.length;
    this.openedTickets = 0;
    this.closedTickets = 0;
    this.reopnedTickets = 0;

    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].status == 0) {
        this.openedTickets += 1;
      } else if (this.array[i].status == 1) {
        this.closedTickets += 1;
      } else {
        this.reopnedTickets += 1;
      }
    }
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
