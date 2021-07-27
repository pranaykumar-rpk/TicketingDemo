import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  userData? : User;
  constructor() { }

  setUserData(data:User){
    this.userData = data;
  }

  getuserData(){
    return this.userData;
  }
}
