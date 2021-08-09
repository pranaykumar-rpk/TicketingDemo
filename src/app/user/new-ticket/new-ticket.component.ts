import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { StatusTicket } from 'src/app/models/status-ticket.enum';
import { Ticket } from 'src/app/models/ticket';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css'],
})
export class NewTicketComponent implements OnInit {
  isLoading: boolean = false;
  selectedCategory?: string;
  selectedType?: string;
  selectedItem?: string;
  myGroup!: FormGroup;
  ticket?: Ticket;

  constructor(
    private firestore: AngularFirestore,
    private database: AngularFireDatabase,
    private snakBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  categories: Category[] = [
    { value: 'Internal IT Services', viewValue: 'Internal IT Services' },
    { value: 'HR Services', viewValue: 'HR Services' },
    { value: 'Administrative Services', viewValue: 'Administrative Services' },
  ];

  interItTypes: Item[] = [
    { value: 'Access Rights', viewValue: 'Access Rights' },
    { value: 'Mobility Services', viewValue: 'Mobility Services' },
    { value: 'Email Services', viewValue: 'Email Services' },
    {
      value: 'Infrastructure Services - Voice',
      viewValue: 'Infrastructure Services - Voice',
    },
    {
      value: 'Infrastructure Services - BPS Voice',
      viewValue: 'Infrastructure Services - BPS Voice',
    },
  ];

  hrTypes: Item[] = [
    { value: 'APAC', viewValue: 'APAC' },
    { value: 'Career Hub', viewValue: 'Career Hub' },
    { value: 'United Kingdom', viewValue: 'United Kingdom' },
    { value: 'Ireland', viewValue: 'Ireland' },
    { value: 'Chile', viewValue: 'Chile' },
  ];

  administrativeTypes: Item[] = [
    { value: 'Transportation', viewValue: 'Transportation' },
    {
      value: 'Remote Energy Monitoring',
      viewValue: 'Remote Energy Monitoring',
    },
    { value: 'Clinet Visit Management', viewValue: 'Clinet Visit Management' },
    { value: 'Despatch', viewValue: 'Despatch' },
    { value: 'Workstation', viewValue: 'Workstation' },
  ];

  internalItems: Item[] = [{ value: 'Asset', viewValue: 'Asset' }];

  hrItems: Item[] = [
    { value: 'Benifits - HIS', viewValue: 'Benifits - HIS' },
    {
      value: 'Benifits - Leaves / Holidays',
      viewValue: 'Benifits - Leaves / Holidays',
    },
    { value: 'Salary', viewValue: 'Salary' },
    { value: 'Contact Information', viewValue: 'Contact Information' },
    {
      value: 'Learning and Development',
      viewValue: 'Learning and Development',
    },
  ];

  administrativeItems: Item[] = [
    { value: 'Internal', viewValue: 'Internal' },
    { value: 'External', viewValue: 'External' },
  ];

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      cat: new FormControl(),
      type: new FormControl(),
      item: new FormControl(),
      description: new FormControl(),
    });
  }

  submitTicket() {
    console.log('Submit Ticket was called');
    const emailId = this.authService.getEmail();
    this.isLoading = true;
    var currentTimeInMilliseconds = Date.now(); // unix timestamp in milliseconds
    console.log('Time in millisceonds:', currentTimeInMilliseconds);
    const formData = this.myGroup.value;
    let ticketId = this.database.createPushId();
    console.log('Unique key:', ticketId);
    const newTicket = new Ticket(
      ticketId, // ticketId
      formData.item, //item
      formData.description, //description
      StatusTicket.OPEN, //ticketrStatus
      currentTimeInMilliseconds, //loggedDate
      null!, //resolvedDate
      emailId, //raisedBy
      'admin', //assignedTo
      formData.cat, //category
      formData.type, //type
      null! //solution
    );

    const myObjStr = JSON.stringify(newTicket);
    console.log(JSON.parse(myObjStr));

    this.firestore
      .collection('tickets')
      .doc(ticketId)
      .set(JSON.parse(myObjStr))
      .then((data) => {
        console.log('Added Ticket Successfully:', data);
        this.isLoading = false;
        this.snakBar.open('Raised Ticket Succesfully', 'dismiss', {
          duration: 2000,
        });
        this.router.navigate(['ticket-details'], {
          relativeTo: this.route.parent,
        });
      })
      .catch((err) => {
        console.log('Error while adding ticket:', err);
        this.isLoading = false;
        this.snakBar.open('Error! Unable to process', 'dismiss', {
          duration: 5000,
        });
      });
  }
}
