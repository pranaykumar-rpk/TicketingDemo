import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase: AngularFirestore) { }

  // employeeList!: AngularFireList<any>;

  // getEmployees() {
  //   this.employeeList = this.firebase.list('user');
  //   return this.employeeList.snapshotChanges();
  // }

}
