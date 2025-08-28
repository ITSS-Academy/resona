import {Component, EventEmitter, Output} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  searchText: string = '';

  constructor(private router: Router) {}

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  navigateToSearch() {
    if (this.searchText.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.searchText } });
    } else {
      this.router.navigate(['/search']);
    }
  }
}
