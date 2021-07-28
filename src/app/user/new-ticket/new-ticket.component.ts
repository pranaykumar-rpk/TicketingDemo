import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { StatusTicket } from 'src/app/models/status-ticket.enum';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css'],
})
export class NewTicketComponent implements OnInit {
  selectedCategory?: string;
  selectedType?: string;
  selectedItem?: string;
  myGroup!: FormGroup;
  ticket?: Ticket;
  constructor(private firestore: AngularFirestore) {}

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
    { value: 'United Kingdom', viewValue: 'EditTicketComponent' },
    { value: 'Ireland', viewValue: 'Ireland' },
    { value: 'Chile', viewValue: 'Chile' },
  ];

  administrativeTypes: Item[] = [
    { value: 'Transportation', viewValue: 'APAC' },
    { value: 'Remote Energy Monitoring', viewValue: 'Career Hub' },
    { value: 'Clinet Visit Management', viewValue: 'EditTicketComponent' },
    { value: 'Despatch', viewValue: 'Ireland' },
    { value: 'Workstation', viewValue: 'Chile' },
  ];

  internalItems: Item[] = [
    { value: 'Transportation', viewValue: 'APAC' },
    { value: 'Remote Energy Monitoring', viewValue: 'Career Hub' },
    { value: 'Clinet Visit Management', viewValue: 'EditTicketComponent' },
    { value: 'Despatch', viewValue: 'Ireland' },
    { value: 'Workstation', viewValue: 'Chile' },
  ];

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
      description : new FormControl()
    });
  }

  submitTicket() {
    var date =  Date.now();
    console.log('Submit Ticket was called');
    const formData = this.myGroup.value;
    
    this.ticket = {
      ticketId : "678243o5",
      status : StatusTicket.OPEN,
      raisedBy : "1797150",
      loggedDate : 1627499808,
      item : formData.item,
      description  : formData.description,
      category : formData.cat,
      assignedTo : "admin"
     }
    
  this.firestore.collection("tickets").add(this.ticket).then(data=>{
      console.log("Added Ticket Successfully:",data);
  }).catch(err=>{
      console.log("Error while adding ticket:", err);
  });    

  // this.firestore.collection("tickets").doc("7wRJ9xhZNBeBPbcrC6VC").update({
  //   status: "close",
  //   solution:"hfkhcewrn"
  // }).then(doc=>{
  //     console.log("Updated Successfully");
  // }).catch(err=>{
  //   console.log("Error ",err);
  // });
  
  }
}
