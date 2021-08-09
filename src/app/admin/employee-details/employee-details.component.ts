import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['firstName', 'lastName', 'gender', 'emailId', 'empId', 'mobileNumber', 'role'];
  dataSource!: MatTableDataSource<any>;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.firestore.collection("users").valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}