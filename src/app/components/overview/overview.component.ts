import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-overview',
  imports: [
    MatIconModule,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit , OnDestroy {

  constructor(
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

}

