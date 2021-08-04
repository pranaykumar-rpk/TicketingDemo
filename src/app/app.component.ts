import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TicketingSystem';
  email?: string;
  password?: string;
  remail?: string;
  rpassword?: string;
  rcpassword?: string;
  myGroup!: FormGroup;
  genders: string[] = ['Male', 'Female'];
  selectedGender?: string;
  
  constructor(private snackBar: MatSnackBar,private authService: AuthService) {}

  register() {
    console.log('Called ReGister Method');
    const formData = this.myGroup.value;
    console.log('EmpId:', formData.empId);
    console.log('Email:', formData.email);
    console.log('password:', formData.password);
    console.log('FirstName:', formData.firstName);
    console.log('LastName:', formData.lastName);
    console.log('Role:', formData.role);
    console.log('phoneNumber:', formData.phoneNumber);
    console.log('gender:', formData.gender);
    console.log('dob:', formData.dob);
    console.log('file:', formData.file);
  }
  login() {
    console.log('Called Login Method');
    const formData = this.myGroup.value;
    console.log('Email:', formData.email);
    console.log('password:', formData.password);
    this.authService.login(formData.email,formData.password);
    this.snackBar.open('Logged In Successfully', 'dismiss', {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      empId: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      role: new FormControl(),
      phoneNumber: new FormControl(),
      gender: new FormControl(),
      dob: new FormControl(),
      file: new FormControl(),
    });
  }
  onFileChange(event: any) {}

  logout(){
    console.log("Called logout");
    this.authService.logout();
    this.snackBar.open('Logg out succesfully', 'dismiss', {
      duration: 2000,
    });
  }
}
