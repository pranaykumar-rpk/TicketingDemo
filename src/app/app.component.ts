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
    var uid = await this.authService.register(
      formData.email,
      formData.password
    );

    var date = new Date(formData.dob);
    console.log('Date:', date);
    console.log('Date in milliseconds:', date.getUTCSeconds());

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
        formData.phoneNumber,
        formData.role,
        null!, //joined date
        "Anju Bhargavi Gunisetti", //reports
        'Internal', //projectId
        'Bank Of America', //project name
        [], //awards[]
        null!, //dateOfBirth
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
  }
  login() {
    console.log('Called Login Method');
    const formData = this.myGroup.value;
    console.log('Email:', formData.email);
    console.log('password:', formData.password);
    this.authService.login(formData.email, formData.password);
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

  async onFileChange(event: any) {
    console.log('Event:', event);
    this.filePath = event.target.files[0];
    // var  downloadURL =  this.authService.uploadImage(this.filePath!,"7032393942");
    // (await downloadURL).subscribe(url => {
    //   console.log("Image URL:",url);
    //   return url;
    // });
  }

  logout() {
    console.log('Called logout');
    this.authService.logout();
    this.snackBar.open('Logg out succesfully', 'dismiss', {
      duration: 2000,
    });
  }
}
