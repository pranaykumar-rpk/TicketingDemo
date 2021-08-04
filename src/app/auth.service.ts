import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;

  constructor(public afAuth: AngularFireAuth, public router: Router) {
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
}
