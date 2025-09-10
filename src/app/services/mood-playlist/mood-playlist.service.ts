import { Injectable } from '@angular/core';
import {MoodPlaylistModel} from '../../models/moodPlaylist.model';

@Injectable({
  providedIn: 'root'
})
export class MoodPlaylistService {
  playlists: MoodPlaylistModel[] = [
    { name: 'new release',         imageUrl: 'https://placehold.co/600x600?text=Happy%20Vibes', tracks: 25 },
    { name: 'popular',           imageUrl: 'https://placehold.co/600x600?text=Chill%20Out', tracks: 18 },
    { name: 'Sad Songs',           imageUrl: 'https://placehold.co/600x600?text=Sad%20Songs', tracks: 30 },
    { name: 'Party Time',          imageUrl: 'https://placehold.co/600x600?text=Party%20Time', tracks: 22 },
    { name: 'Focus Beats',         imageUrl: 'https://placehold.co/600x600?text=Focus%20Beats', tracks: 40 },
    { name: 'Romantic Nights',     imageUrl: 'https://placehold.co/600x600?text=Romantic%20Nights', tracks: 15 },
    { name: 'Workout Energy',      imageUrl: 'https://placehold.co/600x600?text=Workout%20Energy', tracks: 28 },
    { name: 'Rainy Day Chill',     imageUrl: 'https://placehold.co/600x600?text=Rainy%20Day%20Chill', tracks: 19 },
    { name: 'Lo-Fi Study',         imageUrl: 'https://placehold.co/600x600?text=Lo-Fi%20Study', tracks: 33 },
    { name: 'Throwback Classics',  imageUrl: 'https://placehold.co/600x600?text=Throwback%20Classics', tracks: 27 },
    { name: 'Summer Hits',         imageUrl: 'https://placehold.co/600x600?text=Summer%20Hits', tracks: 21 },
    { name: 'Winter Warmth',       imageUrl: 'https://placehold.co/600x600?text=Winter%20Warmth', tracks: 17 },
    { name: 'Road Trip',           imageUrl: 'https://placehold.co/600x600?text=Road%20Trip', tracks: 26 },
    { name: 'Morning Boost',       imageUrl: 'https://placehold.co/600x600?text=Morning%20Boost', tracks: 12 },
    { name: 'Late Night Vibes',    imageUrl: 'https://placehold.co/600x600?text=Late%20Night%20Vibes', tracks: 29 },
    { name: 'Jazz Lounge',         imageUrl: 'https://placehold.co/600x600?text=Jazz%20Lounge', tracks: 24 },
    { name: 'Acoustic Chill',      imageUrl: 'https://placehold.co/600x600?text=Acoustic%20Chill', tracks: 20 },
    { name: 'Electronic Beats',    imageUrl: 'https://placehold.co/600x600?text=Electronic%20Beats', tracks: 34 },
    { name: 'Indie Vibes',         imageUrl: 'https://placehold.co/600x600?text=Indie%20Vibes', tracks: 22 },
    { name: 'Classical Calm',      imageUrl: 'https://placehold.co/600x600?text=Classical%20Calm', tracks: 31 },
    { name: 'Tropical House',      imageUrl: 'https://placehold.co/600x600?text=Tropical%20House', tracks: 23 },
    { name: 'Deep Focus',          imageUrl: 'https://placehold.co/600x600?text=Deep%20Focus', tracks: 35 },
    { name: 'Coding Mode',         imageUrl: 'https://placehold.co/600x600?text=Coding%20Mode', tracks: 28 },
    { name: 'Coffee Shop',         imageUrl: 'https://placehold.co/600x600?text=Coffee%20Shop', tracks: 19 },
    { name: 'Sunset Drive',        imageUrl: 'https://placehold.co/600x600?text=Sunset%20Drive', tracks: 26 },
    { name: 'Midnight Lo-Fi',      imageUrl: 'https://placehold.co/600x600?text=Midnight%20Lo-Fi', tracks: 32 },
    { name: 'Ambient Sleep',       imageUrl: 'https://placehold.co/600x600?text=Ambient%20Sleep', tracks: 27 },
    { name: 'Latin Fiesta',        imageUrl: 'https://placehold.co/600x600?text=Latin%20Fiesta', tracks: 24 },
    { name: 'K-Pop Fever',         imageUrl: 'https://placehold.co/600x600?text=K-Pop%20Fever', tracks: 20 },
    { name: 'Hip-Hop Essentials',  imageUrl: 'https://placehold.co/600x600?text=Hip-Hop%20Essentials', tracks: 36 }
    // { name: 'Happy Vibes',        imageUrl: 'https://images.pexels.com/photos/164745/pexels-photo-164745.jpeg', tracks: 25 },
    // { name: 'Chill Out',          imageUrl: 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg', tracks: 18 },
    // { name: 'Sad Songs',          imageUrl: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg', tracks: 30 },
    // { name: 'Party Time',         imageUrl: 'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg', tracks: 22 },
    // { name: 'Focus Beats',        imageUrl: 'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg', tracks: 40 },
    // { name: 'Romantic Nights',    imageUrl: 'https://images.pexels.com/photos/556669/pexels-photo-556669.jpeg', tracks: 15 },
    // { name: 'Workout Energy',     imageUrl: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg', tracks: 28 },
    // { name: 'Rainy Day Chill',    imageUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg', tracks: 19 },
    // { name: 'Lo-Fi Study',        imageUrl: 'https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg', tracks: 33 },
    // { name: 'Throwback Classics', imageUrl: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg', tracks: 27 },
    // { name: 'Summer Hits',        imageUrl: 'https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg', tracks: 21 },
    // { name: 'Winter Warmth',      imageUrl: 'https://images.pexels.com/photos/374148/pexels-photo-374148.jpeg', tracks: 17 },
    // { name: 'Road Trip',          imageUrl: 'https://images.pexels.com/photos/21014/pexels-photo.jpg', tracks: 26 },
    // { name: 'Morning Boost',      imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg', tracks: 12 },
    // { name: 'Late Night Vibes',   imageUrl: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg', tracks: 29 },
    // { name: 'Jazz Lounge',        imageUrl: 'https://images.pexels.com/photos/164936/pexels-photo-164936.jpeg', tracks: 24 },
    // { name: 'Acoustic Chill',     imageUrl: 'https://images.pexels.com/photos/210854/pexels-photo-210854.jpeg', tracks: 20 },
    // { name: 'Electronic Beats',   imageUrl: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg', tracks: 34 },
    // { name: 'Indie Vibes',        imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', tracks: 22 },
    // { name: 'Classical Calm',     imageUrl: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg', tracks: 31 },
    // { name: 'Tropical House',     imageUrl: 'https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg', tracks: 23 },
    // { name: 'Deep Focus',         imageUrl: 'https://images.pexels.com/photos/374016/pexels-photo-374016.jpeg', tracks: 35 },
    // { name: 'Coffee Shop',        imageUrl: 'https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg', tracks: 19 },
    // { name: 'Coding Mode',        imageUrl: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg', tracks: 28 },
    // { name: 'Sunset Drive',       imageUrl: 'https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg', tracks: 26 },
    // { name: 'Midnight Lo-Fi',     imageUrl: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg', tracks: 32 },
    // { name: 'Ambient Sleep',      imageUrl: 'https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg', tracks: 27 },
    // { name: 'Latin Fiesta',       imageUrl: 'https://images.pexels.com/photos/21014/pexels-photo.jpg', tracks: 24 },
    // { name: 'K-Pop Fever',        imageUrl: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg', tracks: 20 },


    // {
    //   name: 'Happy Vibes', imageUrl: 'https://images.unsplash.com/photo-1521334884684-d80222895322', tracks: 25 },
    // {
    //   name: 'Chill Out', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', tracks: 18 },
    // {
    //   name: 'Sad Songs', imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', tracks: 30 },
    // {
    //   name: 'Party Time', imageUrl: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439', tracks: 22 },
    // {
    //   name: 'Focus Beats', imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', tracks: 40 },
    // {
    //   name: 'Romantic Nights', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', tracks: 15 },
    // {
    //   name: 'Workout Energy', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', tracks: 28 },
    // {
    //   name: 'Rainy Day Chill', imageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29', tracks: 19 },
    // {
    //   name: 'Lo-Fi Study', imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511', tracks: 33 },
    // {
    //   name: 'Throwback Classics', imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f', tracks: 27 },
    // {
    //   name: 'Summer Hits', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', tracks: 21 },
    // {
    //   name: 'Winter Warmth', imageUrl: 'https://images.unsplash.com/photo-1489587027561-3cf1a65d0fe9', tracks: 17 },
    // {
    //   name: 'Road Trip', imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee', tracks: 26 },
    // {
    //   name: 'Morning Boost', imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', tracks: 12 },
    // {
    //   name: 'Late Night Vibes', imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4', tracks: 29 },
    // {
    //   name: 'Jazz Lounge', imageUrl: 'https://images.unsplash.com/photo-1524777318188-8c7b1f1e1d3f', tracks: 24 },
    // {
    //   name: 'Acoustic Chill', imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9', tracks: 20 },
    // {
    //   name: 'Electronic Beats', imageUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc', tracks: 34 },
    // {
    //   name: 'Indie Vibes', imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3', tracks: 22 },
    // {
    //   name: 'Classical Calm', imageUrl: 'https://images.unsplash.com/photo-1503264116251-35a269479413', tracks: 31 }
  ];
}
