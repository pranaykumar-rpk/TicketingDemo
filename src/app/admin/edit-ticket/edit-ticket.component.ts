import { Component, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css'],
})
export class EditTicketComponent {
  newSolution!: any;
  newStatus!: any;
  newResolvedDate!: any;

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<EditTicketComponent>,
   // public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClick(): void {
    this.dialogRef.close();
  }
  updateDescription(): void {
    if (
      this.newSolution == this.data.solution &&
      this.newStatus == this.data.status &&
      this.newResolvedDate == this.data.resolvedDate
    ) {
      //this.showErrorMsg();
    } else {
      this.firestore.collection('tickets').doc(this.data.ticketId).update({
        solution: this.newSolution,
        status: this.newStatus,
        resolvedDate: Date.now(),
      });
      this.dialogRef.close();
    }
  }

  ngOnInit() {
    this.newStatus = this.data.status;
    this.newSolution = this.data.solution;
    this.newResolvedDate = this.data.resolvedDate;
  }

  // showErrorMsg() {
  //   this.toastr.error('Unable to save, Data is not modified', 'Error Msg',{});
  // }
}
