import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {NgClass} from '@angular/common';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {Observable, Subscription} from 'rxjs';
import {ProfileModel} from '../../models/profile.model';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialModule, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit , OnDestroy{
  @Input() collapsed!: boolean

  currentUser$!: Observable<ProfileModel>;
  currentUser!: ProfileModel;
  subscription: Subscription[]=[];

  constructor(
    private router: Router,
    private store: Store<{
      auth: AuthState;
    }>
  ) {
    this.currentUser$ = this.store.select('auth', 'currentUser');
  }

  ngOnInit() {
    this.subscription.push(
      this.currentUser$.subscribe(currentUser => {
        console.log('Current User: ',currentUser);

        if (currentUser.id) {
          this.currentUser = currentUser;
          console.log('Current User: ',currentUser);
        }
      }),
    )
  }

  ngOnDestroy() {}

  routes = [
    { icon: 'home', title: 'Home', route: 'home' },
    { icon: 'category', title: 'Category', route: 'category' },
    { icon: 'cloud_upload', title: 'Upload', route: 'upload' },
    { icon: 'account_circle', title: 'Profile', route: `profile/${this.currentUser.id}` },
  ];
}



