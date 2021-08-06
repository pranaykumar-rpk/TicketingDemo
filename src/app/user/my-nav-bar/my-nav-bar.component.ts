import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-nav-bar',
  templateUrl: './my-nav-bar.component.html',
  styleUrls: ['./my-nav-bar.component.css'],
})
export class MyNavBarComponent implements OnInit {
  constructor(private authService: AuthService) {}
  ngOnInit(): void {}

  signOut() {
    console.log('Called sign out');
    this.authService.logout();
  }
}
