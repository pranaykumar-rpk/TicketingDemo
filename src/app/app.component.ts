import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './models/user';

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
  isLoading: boolean = false;
  filePath?: string;

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  async register() {
    this.isLoading = true;
    console.log('Called ReGister Method');
    const formData = this.myGroup.value;
    this.printDetails(formData);
    if (this.checkAllFileds(formData)) {
      if (this.validatePasswordAndConfirmPassword(formData)) {
        this.authenticate(formData);
      } else {
        this.isLoading = false;
        this.snackBar.open(
          'Password and Confirm password not matched',
          'dismiss',
          {
            duration: 2000,
          }
        );
      }
    } else {
      this.isLoading = false;
      this.snackBar.open('Enter all details', 'dismiss', {
        duration: 2000,
      });
    }
  }

  async authenticate(formData: any) {
    try {
      var uid = await this.authService.register(
        formData.emailId,
        formData.password
      );

      var dateOfBirth = new Date(formData.dob).getTime();
      var joinedDate = new Date(formData.joinedDate).getTime();
      var downloadURL = this.authService.uploadImage(
        this.filePath!,
        formData.emailId
      );
      (await downloadURL).subscribe((url) => {
        console.log('Image URL:', url);

        const newUser = new User(
          formData.firstName,
          formData.lastName,
          formData.gender,
          formData.emailId,
          formData.empId,
          formData.phoneNumber, //mobile number
          formData.role, //role
          joinedDate, //joined date
          'Anju Bhargavi Gunisetti', //reports
          'Internal', //projectId
          'Bank Of America', //project name
          [], //awards[]
          dateOfBirth, //dateOfBirth
          url
        );
        const myObjStr = JSON.stringify(newUser);
        console.log(JSON.parse(myObjStr));

        this.firestore
          .collection('users')
          .doc(uid)
          .set(JSON.parse(myObjStr))
          .then((data) => {
            console.log('Added user info Successfully:', data);
            this.isLoading = false;
            this.snackBar.open('User Registrated succesfully', 'dismiss', {
              duration: 2000,
            });
            //this.router.navigate(['/my-tickets']);
          })
          .catch((err) => {
            console.log('Error while adding user:', err);
            this.isLoading = false;
            this.snackBar.open('Error! Unable to register', 'dismiss', {
              duration: 2000,
            });
          });
      });
    } catch (error) {
      this.isLoading = false;
      console.log('Error while signing in:', error);
      this.snackBar.open('Error! Unable to register', 'dismiss', {
        duration: 2000,
      });
    }
  }

  validatePasswordAndConfirmPassword(formData: any): boolean {
    return formData.password == formData.confirmPassword;
  }

  checkAllFileds(formData: any): boolean {
    if (
      formData.empId == undefined ||
      formData.emailId == undefined ||
      formData.password == undefined ||
      formData.confirmPassword == undefined ||
      formData.firstName == undefined ||
      formData.lastName == undefined ||
      formData.role == undefined ||
      formData.phoneNumber == undefined ||
      formData.gender == undefined ||
      formData.dob == undefined ||
      formData.file == undefined ||
      formData.file == null
    ) {
      return false;
    }
    return true;
  }

  printDetails(formData: any) {
    console.log('EmpId:', formData.empId);
    console.log('Email:', formData.emailId);
    console.log('Password:', formData.password);
    console.log('Confirm Password:', formData.confirmPassword);
    console.log('FirstName:', formData.firstName);
    console.log('LastName:', formData.lastName);
    console.log('Role:', formData.role);
    console.log('phoneNumber:', formData.phoneNumber);
    console.log('gender:', formData.gender);
    console.log('dob:', formData.dob);
    console.log('file:', formData.file);
  }

  async login() {
    console.log('Called Login Method');
    const formData = this.myGroup.value;
    console.log('Email:', formData.emailId);
    console.log('password:', formData.password);
    if (
      formData.emailId == undefined ||
      formData.password == undefined ||
      formData.emailId == null ||
      formData.password == null
    ) {
      this.snackBar.open('Enter email and password', 'dismiss', {
        duration: 2000,
      });
    } else {
      var result = await this.authService.login(
        formData.emailId,
        formData.password
      );
      if (result == 0) {
        this.snackBar.open('Logged In Successfully', 'dismiss', {
          duration: 2000,
        });
      } else {
        this.snackBar.open('Invalid Credentials', 'dismiss', {
          duration: 2000,
        });
      }
    }
  }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      empId: new FormControl(),
      emailId: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      role: new FormControl(),
      phoneNumber: new FormControl(),
      gender: new FormControl(),
      dob: new FormControl(),
      joinedDate: new FormControl(),
      file: new FormControl(),
    });
  }

  async onFileChange(event: any) {
    console.log('Event:', event);
    this.filePath = event.target.files[0];
  }

  logout() {
    console.log('Called logout');
    this.authService.logout();
    this.snackBar.open('Logg out succesfully', 'dismiss', {
      duration: 2000,
    });
  }
}
