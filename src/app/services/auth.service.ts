import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  isUserLoggedIn: boolean = false;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private afStorage: AngularFireStorage
  ) {
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.user = user;
    //     this.isUserLoggedIn = true;
    //     console.log('User logged in', user.uid);
    //     //navigate to home screen
    //     this.router.navigate(['/home']);
    //   } else {
    //     console.log('No User logged in');
    //   }
    // });
  }

  async login(email: string, password: string): Promise<number> {
    console.log('Called login method with credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      var result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log('Result:', result);
      this.isUserLoggedIn = true;
      return 0;
    } catch (e) {
      console.log('Error while login', e);
      this.isUserLoggedIn = false;
      return 1;
    }
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
    this.isUserLoggedIn = false;
    this.router.navigate(['auth']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async uploadImage(file: string, emailId: string) {
    console.log('Email ID in upload image:', emailId);
    var downloadURL;
    console.log('In Service:', file);
    const filePath = '/profiles/' + emailId;
    const fileRef = this.afStorage.ref(filePath);
    await this.afStorage.upload(filePath, file);
    downloadURL = fileRef.getDownloadURL();
    return downloadURL;
  }
}