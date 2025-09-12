import { Injectable } from '@angular/core';
import {PopularArtistModel} from '../../models/popularArtist.model';

@Injectable({
  providedIn: 'root'
})
export class PopularArtistService {
  artists: PopularArtistModel[] = [
    { name: 'Eminem', imageUrl: 'https://storage.googleapis.com/a1aa/image/baab503d-46f0-4100-fe62-16d5b62cb921.jpg' },
    { name: 'The Weekend', imageUrl: 'https://storage.googleapis.com/a1aa/image/a313b2fc-895f-4a75-b28e-520be109364f.jpg' },
    { name: 'Adele', imageUrl: 'https://storage.googleapis.com/a1aa/image/70374d57-2f63-4c33-fdf9-ce6b9fa36157.jpg' },
    { name: 'Lana Del Ray', imageUrl: 'https://storage.googleapis.com/a1aa/image/31b1495a-dede-4073-b0ed-f729a8114e37.jpg' },
    { name: 'Billie Eilish', imageUrl: 'https://storage.googleapis.com/a1aa/image/1338182e-0d67-43ea-c6ee-33636c4593b5.jpg'},
  ];
}
