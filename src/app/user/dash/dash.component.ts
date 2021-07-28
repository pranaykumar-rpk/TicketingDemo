import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ProfileServiceService } from '../profile-service.service';
import { User } from 'src/app/models/user';
import { Award } from 'src/app/models/award';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit{
  userData?: User;
  awards?: Award[]=[];

  ngOnInit(): void {
    this.userData = this.profileService.getuserData();
    this.awards =  this.userData?.awards;
    console.log("Data from user home component is:",this.userData);
    console.log("Awards data: ",this.awards);
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Basic Info', cols: 1, rows: 1, name: this.userData?.firstName},
          { title: 'Organisation Info', cols: 1, rows: 1 },
          { title: 'Awards', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Basic Info', cols: 1, rows: 2 },
        { title: 'Organisation Info', cols: 1, rows: 1 },
        { title: 'Awards', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,private profileService: ProfileServiceService) {
    
  }

  getDate(seconds? : number){
    var d = new Date(0); 
    d.setUTCMilliseconds(seconds==undefined?0:seconds);
    return d.toLocaleDateString();
  }
}
