import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ProfileServiceService } from '../profile-service.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit{
  userData?: User;

  ngOnInit(): void {
    this.userData = this.profileService.getuserData();
    console.log("Data from user home component is:",this.userData);
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
}
