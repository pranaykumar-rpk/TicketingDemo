import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileServiceService } from '../profile-service.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  tickets: Ticket[] = [];
  userData: User = {};
  isLoading: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    private profileService: ProfileServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  async loadUserData() {
    this.isLoading = true;
    var user = this.authService.getUid();
    this.firestore
      .collection('users')
      .doc(user)
      .ref.get()
      .then((doc) => {
        this.userData = doc.data() as User;
        console.log('firstName: ', this.userData.firstName);
        this.isLoading = false;
        this.profileService.setUserData(this.userData);
      });
    // this.firestore.collection("users").ref.where("emailId", "==", emailId).get().then(doc=>{
    //     console.log("isEmpty=", doc.empty);
    //     console.log("doc data: ",doc.docs[0].data());
    //     this.userData = doc.docs[0].data() as User;
    //     console.log("firstName: ",this.userData.firstName);
    //     this.isLoading = false;
    //     this.profileService.setUserData(this.userData);
    // });
  }
}
