import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {NgClass} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {PlayerBarComponent} from '../player-bar/player-bar.component';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialModule, NgClass, RouterOutlet, PlayerBarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  activeLink = '';
  constructor(private router: Router) {
  }

  menuItems = [
    { icon: 'home', title: 'Home', route: 'home' },
    { icon: 'category', title: 'Category', route: 'category' },
    { icon: 'cloud_upload', title: 'Upload', route: 'upload' },
    { icon: 'account_circle', title: 'Profile', route: 'profile' },
  ];

  ngOnInit() {
    this.setActiveLink();
  }

  onMenuClick(route: string) {
    this.router.navigate([route]);
  }

  setActiveLink(): void {
    if (this.router.url.includes('/home')) {
      this.activeLink = this.menuItems[0].route;
    } else if (this.router.url.includes('/profile')) {
      this.activeLink = this.menuItems[1].route;
    } else if (this.router.url.includes('/category')) {
      this.activeLink = this.menuItems[2].route;
    } else if (this.router.url.includes('/upload')) {
      this.activeLink = this.menuItems[3].route;
    }  else {
      this.activeLink = '';
    }
  }
}
