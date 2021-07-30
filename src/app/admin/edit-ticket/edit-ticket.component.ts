import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  DialogRole,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css'],
})
export class EditTicketComponent {
  newSolution!: any;
  description: any;
  newStatus!: any;
  newResolvedDate!: any;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<EditTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onClick(): void {
    this.dialogRef.close();
  }
  updateDescription(): void {
    this.firestore.collection('tickets').doc(this.data.ticketId).update({
      solution: this.newSolution,
      status: this.newStatus,
      resolvedDate: Date.now()
    });  
    this.dialogRef.close();
  }

  ngOnInit() {
    this.newStatus = this.data.status;
    this.newSolution = this.data.solution;
    this.newResolvedDate = this.data.resolvedDate;
  }
}
