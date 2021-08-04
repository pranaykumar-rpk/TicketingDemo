export class User {
  firstName?: string;
  lastName?: string;
  gender?: string;
  emailId?: string;
  empId?: number;
  mobileNumber?: string;
  role?: string;
  joinedDate?: number;
  reportsTo?: string;
  projectId?: string;
  projectName?: string;
  awards?: Award[] = [];
  dateOfBirth?: number;
  profilePicUrl?: string;

  constructor(
    firstName : string,
    lastName : string,
    gender : string,
    emailId : string,
    empId : number,
    mobileNumber : string,
    role : string,
    joinedDate : number,
    reportsTo : string,
    projectId : string,
    projectName : string,
    awards : [],
    dateOfBith: number,
    profilePicUrl : string
  ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.gender = gender;
      this.emailId = emailId;
      this.empId = empId;
      this.mobileNumber = mobileNumber;
      this.role = role;
      this.joinedDate = joinedDate;
      this.reportsTo = reportsTo;
      this.projectId = projectId;
      this.projectName = projectName;
      this.awards = awards;
      this.dateOfBirth = dateOfBith;
      this.profilePicUrl = profilePicUrl;
  }
}

export class Award {
  awardName?: string;
  givenBy?: string;
  date?: number;
}
