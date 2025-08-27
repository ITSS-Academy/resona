import {Component, Input, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {NgClass} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialModule, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() collapsed!: boolean

  protected readonly RouterLink = RouterLink;

  routes = [
    { icon: 'home', title: 'Home', route: 'home' },
    { icon: 'category', title: 'Category', route: 'category' },
    { icon: 'cloud_upload', title: 'Upload', route: 'upload' },
    { icon: 'account_circle', title: 'Profile', route: 'profile' },
  ];
}



