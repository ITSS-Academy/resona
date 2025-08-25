import { Component } from '@angular/core';
import {MaterialModule} from '../../shared/modules/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-playlist-dialog',
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-playlist-dialog.component.html',
  styleUrl: './create-playlist-dialog.component.scss',

})
export class CreatePlaylistDialogComponent {

}
