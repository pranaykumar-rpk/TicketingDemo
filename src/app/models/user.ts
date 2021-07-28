import { Timestamp } from "rxjs/internal/operators/timestamp";

export class User{
    firstName? : string;
    lastName?: string;
    gender?: string;
    emailId? : string;
    empId?: number;
    mobileNumber?: string;
    role?: string;
    joinedDate?: number;
    reportsTo?: string;
    projectId?: string;
    projectName?: string;
    awards? : Award[]=[];
    dateOfBirth? : number;
}

export class Award{
    awardName? : string;
    givenBy?: string;
    date? : number;
}

