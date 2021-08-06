import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-nav-bar',
  templateUrl: './my-nav-bar.component.html',
  styleUrls: ['./my-nav-bar.component.css'],
})
export class MyNavBarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {}

  signOut() {
    console.log('Called sign out');
    this.authService.logout();
  }

  navigateTo(url: string) {
    this.router.navigate([url], { relativeTo: this.route.parent });
    //this.router.navigate([`./${url}`]);
  }
}
