import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { ProfileServiceService } from '../profile-service.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  tickets: Ticket[] = [];
  userData: User = {};
  emailId :string = "pranaykumar.rpk@gmail.com";
  isLoading: boolean = false;

  constructor( private firestore:AngularFirestore, private profileService:ProfileServiceService) {
       
   }

  ngOnInit(): void {
    this.loadUserData(this.emailId);
  }

   async loadUserData(emailId:string) { 
    this.isLoading = true;
    this.firestore.collection("users").ref.where("emailId", "==", emailId).get().then(doc=>{
        console.log("isEmpty=", doc.empty);
        console.log("doc data: ",doc.docs[0].data());
        this.userData = doc.docs[0].data() as User;
        console.log("firstName: ",this.userData.firstName);
        this.isLoading = false;
        this.profileService.setUserData(this.userData);
    });
  }
  
}

