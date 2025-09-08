import {Component, inject} from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';

@Component({
  selector: 'app-share-snackbar',
  imports: [
    MaterialModule
  ],
  templateUrl: './share-snackbar.component.html',
  styleUrl: './share-snackbar.component.scss'
})
export class ShareSnackbarComponent {

}

