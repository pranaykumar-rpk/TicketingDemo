import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;

  private basePath: string = '/profiles';

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private afStorage: AngularFireStorage
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log('User logged in', user.uid);
      } else {
        console.log('No User logged in');
      }
    });
  }

  async login(email: string, password: string) {
    console.log('Called login method with credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      var result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log('Result:', result);
    } catch (e) {
      console.log('Error while login', e);
    }
    //  this.router.navigate(['admin/list']);
  }

  async register(email: string, password: string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log('UID:', result.user?.uid);
    return result.user?.uid;
  }

  async logout() {
    await this.afAuth.signOut();
    console.log('Logged out');
    //this.router.navigate(['admin/login']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async uploadImage(file: string, mobileNumber: string) {
    var downloadURL;
    console.log("In Service:",file);
    const filePath = '/profiles/' + mobileNumber;
    const fileRef = this.afStorage.ref(filePath);
    await this.afStorage.upload(filePath, file);
    downloadURL = fileRef.getDownloadURL();
    return downloadURL;      
  }
}
