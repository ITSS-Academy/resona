import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MaterialModule} from './shared/modules/material.module';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {PlayerBarComponent} from './components/player-bar/player-bar.component';
import {NgClass, NgStyle} from '@angular/common';
import {writeErrorToLogFile} from '@angular/cli/src/utilities/log-file';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, SidebarComponent, HeaderComponent, PlayerBarComponent, NgClass, RouterLink, RouterLinkActive, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'resona';
  showFiller = false;
  activeLink = '';

  constructor(private router: Router) {
  }

  playlists = [
    {
      cover: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/518100577_1219056506385355_153354088161105046_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=_b6nktlFyH0Q7kNvwFEarCf&_nc_oc=AdklBebc3MfvvLRc_gvu-gclsGptqpv-GQ8iP0qypSvrdOuaNPzCZ_5C0LVTTCgyJ4U&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=JpFf5KzYHvPVdHLj7u6l-A&oh=00_AfUfwCOshY4TBV5lBx5kVJAi2PjgqiX9FmEp0YscE84gPg&oe=68AF0DC3',
      title: 'My Playlist #1',
    },
    {
      cover: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/518100577_1219056506385355_153354088161105046_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=_b6nktlFyH0Q7kNvwFEarCf&_nc_oc=AdklBebc3MfvvLRc_gvu-gclsGptqpv-GQ8iP0qypSvrdOuaNPzCZ_5C0LVTTCgyJ4U&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=JpFf5KzYHvPVdHLj7u6l-A&oh=00_AfUfwCOshY4TBV5lBx5kVJAi2PjgqiX9FmEp0YscE84gPg&oe=68AF0DC3',
      title: 'My Playlist #2',
    },
    {
      cover: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/518100577_1219056506385355_153354088161105046_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=_b6nktlFyH0Q7kNvwFEarCf&_nc_oc=AdklBebc3MfvvLRc_gvu-gclsGptqpv-GQ8iP0qypSvrdOuaNPzCZ_5C0LVTTCgyJ4U&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=JpFf5KzYHvPVdHLj7u6l-A&oh=00_AfUfwCOshY4TBV5lBx5kVJAi2PjgqiX9FmEp0YscE84gPg&oe=68AF0DC3',
      title: 'My Playlist #3',
    },
    {
      cover: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/518100577_1219056506385355_153354088161105046_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=_b6nktlFyH0Q7kNvwFEarCf&_nc_oc=AdklBebc3MfvvLRc_gvu-gclsGptqpv-GQ8iP0qypSvrdOuaNPzCZ_5C0LVTTCgyJ4U&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=JpFf5KzYHvPVdHLj7u6l-A&oh=00_AfUfwCOshY4TBV5lBx5kVJAi2PjgqiX9FmEp0YscE84gPg&oe=68AF0DC3',
      title: 'My Playlist #4',
    },
    {
      cover: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/518100577_1219056506385355_153354088161105046_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=_b6nktlFyH0Q7kNvwFEarCf&_nc_oc=AdklBebc3MfvvLRc_gvu-gclsGptqpv-GQ8iP0qypSvrdOuaNPzCZ_5C0LVTTCgyJ4U&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=JpFf5KzYHvPVdHLj7u6l-A&oh=00_AfUfwCOshY4TBV5lBx5kVJAi2PjgqiX9FmEp0YscE84gPg&oe=68AF0DC3',
      title: 'My Playlist #5',
    }
  ]

  menuItems = [
    { icon: 'home', title: 'Home', route: 'home' },
    { icon: 'category', title: 'Category', route: 'category' },
    { icon: 'cloud_upload', title: 'Upload', route: 'upload' },
    { icon: 'account_circle', title: 'Profile', route: 'profile' },
  ];

  ngOnInit() {
    this.setActiveLink();
    for (let item of this.menuItems) {
      if (item.route == this.activeLink) {
        console.log('Active link set to:', this.activeLink);
      }
    }
  }

  onMenuClick(route: string) {
    this.router.navigate([route]);
  }

  setActiveLink(): void {
    if (this.router.url.includes('/home')) {
      this.activeLink = this.menuItems[0].route;
    } else if (this.router.url.includes('/category')) {
      this.activeLink = this.menuItems[1].route;
    } else if (this.router.url.includes('/upload')) {
      this.activeLink = this.menuItems[2].route;
    } else if (this.router.url.includes('/profile')) {
      this.activeLink = this.menuItems[3].route;
    }  else {
      this.activeLink = '';
    }
  }
}
