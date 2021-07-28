import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'gender', 'emailId', 'empId', 'mobileNumber', 'role'];

  dataSource!: MatTableDataSource<any>;
  constructor(private firestore: AngularFirestore) { }
  ngOnInit() {
    this.firestore.collection("users").valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }
  
}