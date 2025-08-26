import { Injectable } from '@angular/core';
import {MusicGenresModel} from '../module/musicGenres.model';

@Injectable({
  providedIn: 'root'
})
export class MusicGenresService {

  constructor(
  ) { }

  categories: MusicGenresModel[] = [
    { id: '1', name: 'Pop', image: 'https://i.scdn.co/image/ab67616d0000b27308f3e7a08eb03064e6eb0af7', color: '#FF98BF', description: 'Pop is a mainstream genre with catchy melodies, simple lyrics, and wide appeal, often dominating charts worldwide.' },
    { id: '2', name: 'Rock', image: 'https://www.neatbeats.net/wp-content/uploads/2023/04/1-2.jpg', color: '#999999', description: 'Rock blends electric guitars, drums, and powerful vocals, evolving from classic rock to modern alternative styles.' },
    { id: '3', name: 'Hip-Hop', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoyvm1Y_PRKQ-E30YK6RpSBbOlbTHZd0jMpw&s', color: '#1DB954', description: 'Hip-Hop features rhythmic beats, rap vocals, and storytelling, often reflecting urban culture and social issues.' },
    { id: '4', name: 'Jazz', image: 'https://source.unsplash.com/200x200/?jazz', color: '#6A4C93', description: 'Jazz is an improvisational genre blending swing, blues, and soulful melodies with rich instrumentation.' },
    { id: '5', name: 'Classical', image: 'https://source.unsplash.com/200x200/?classical-music', color: '#F39C12', description: 'Classical music is timeless orchestral composition, from symphonies to concertos, highlighting elegance and depth.' },
    { id: '6', name: 'R&B', image: 'https://source.unsplash.com/200x200/?rnb', color: '#8E44AD', description: 'R&B (Rhythm & Blues) combines soulful vocals with smooth beats, often exploring themes of love and emotion.' },
    { id: '7', name: 'Electronic', image: 'https://source.unsplash.com/200x200/?electronic-music', color: '#3498DB', description: 'Electronic music is driven by synthesized sounds, beats, and experimental production perfect for dance floors.' },
    { id: '8', name: 'Country', image: 'https://source.unsplash.com/200x200/?country-music', color: '#D35400', description: 'Country music tells heartfelt stories with acoustic guitars, fiddles, and lyrics rooted in rural life.' },
    { id: '9', name: 'Reggae', image: 'https://source.unsplash.com/200x200/?reggae', color: '#27AE60', description: 'Reggae is a laid-back genre from Jamaica, known for its offbeat rhythms and messages of peace and unity.' },
    { id: '10', name: 'Blues', image: 'https://source.unsplash.com/200x200/?blues', color: '#2980B9', description: 'Blues conveys deep emotion through soulful guitar riffs and heartfelt lyrics rooted in African-American history.' },
    { id: '11', name: 'Folk', image: 'https://source.unsplash.com/200x200/?folk-music', color: '#2ECC71', description: 'Folk music highlights traditional storytelling, acoustic instruments, and cultural heritage across generations.' },
    { id: '12', name: 'Metal', image: 'https://source.unsplash.com/200x200/?metal-music', color: '#555555', description: 'Metal is intense, featuring heavy guitar riffs, thunderous drums, and raw energy with diverse subgenres.' },
    { id: '13', name: 'Punk', image: 'https://source.unsplash.com/200x200/?punk-music', color: '#C0392B', description: 'Punk is rebellious rock with fast tempos, raw sounds, and lyrics challenging authority and society.' },
    { id: '14', name: 'Soul', image: 'https://source.unsplash.com/200x200/?soul-music', color: '#E67E22', description: 'Soul music blends gospel passion with R&B rhythms, emphasizing heartfelt vocals and deep grooves.' },
    { id: '15', name: 'Disco', image: 'https://source.unsplash.com/200x200/?disco', color: '#F1C40F', description: 'Disco is upbeat, danceable music from the 70s with funky basslines, strings, and dazzling rhythms.' },
    { id: '16', name: 'Dance', image: 'https://source.unsplash.com/200x200/?dance-music', color: '#E74C3C', description: 'Dance music is energetic and club-ready, designed to keep people moving with pulsing beats.' },
    { id: '17', name: 'Latin', image: 'https://source.unsplash.com/200x200/?latin-music', color: '#CB4335', description: 'Latin music is vibrant and rhythmic, influenced by salsa, bachata, and traditional Latin American sounds.' },
    { id: '18', name: 'K-Pop', image: 'https://source.unsplash.com/200x200/?kpop', color: '#FF66CC', description: 'K-Pop is a global phenomenon mixing catchy melodies, sharp choreography, and diverse music styles from Korea.' },
    { id: '19', name: 'Country Pop', image: 'https://source.unsplash.com/200x200/?country-pop', color: '#F5B041', description: 'Country Pop blends traditional country storytelling with modern pop melodies for mass appeal.' },
    { id: '20', name: 'Dancehall', image: 'https://source.unsplash.com/200x200/?dancehall', color: '#28B463', description: 'Dancehall is a Jamaican genre with fast beats, vibrant rhythms, and party-driven lyrics.' },
    { id: '21', name: 'Emo', image: 'https://source.unsplash.com/200x200/?emo-music', color: '#7B7D7D', description: 'Emo combines punk rock with deeply emotional lyrics exploring love, angst, and identity.' },
    { id: '22', name: 'Ambient', image: 'https://source.unsplash.com/200x200/?ambient-music', color: '#ABB2B9', description: 'Ambient music is atmospheric, minimal, and calming, focusing on textures over traditional structure.' },
    { id: '23', name: 'House', image: 'https://source.unsplash.com/200x200/?house-music', color: '#2980B9', description: 'House is electronic dance music with steady beats, uplifting vibes, and a focus on rhythm.' },
    { id: '24', name: 'Techno', image: 'https://source.unsplash.com/200x200/?techno', color: '#2E86C1', description: 'Techno is hypnotic and repetitive electronic music, emphasizing rhythm and futuristic soundscapes.' },
    { id: '25', name: 'Trance', image: 'https://source.unsplash.com/200x200/?trance-music', color: '#6C3483', description: 'Trance creates euphoric atmospheres with layered melodies and driving beats for immersive experiences.' },
    { id: '26', name: 'Dubstep', image: 'https://source.unsplash.com/200x200/?dubstep', color: '#1A5276', description: 'Dubstep is heavy electronic bass music with wobbling drops, syncopated rhythms, and high energy.' },
    { id: '27', name: 'Trap (EDM)', image: 'https://source.unsplash.com/200x200/?trap-music', color: '#9B59B6', description: 'Trap EDM mixes booming bass, sharp hi-hats, and festival-ready drops for high-intensity vibes.' },
    { id: '28', name: 'Drum & Bass', image: 'https://source.unsplash.com/200x200/?drum-and-bass', color: '#16A085', description: 'Drum & Bass is fast-paced electronic music with rapid breakbeats and deep basslines.' },
    { id: '29', name: 'Synthwave', image: 'https://source.unsplash.com/200x200/?synthwave', color: '#8E44AD', description: 'Synthwave revives retro 80s synth sounds with neon aesthetics and nostalgic electronic vibes.' },
    { id: '30', name: 'Vaporwave', image: 'https://source.unsplash.com/200x200/?vaporwave', color: '#F62459', description: 'Vaporwave is dreamy and nostalgic, sampling retro media with surreal, lo-fi electronic textures.' },
    { id: '31', name: 'Chillwave', image: 'https://source.unsplash.com/200x200/?chillwave', color: '#45B39D', description: 'Chillwave blends lo-fi beats with dreamy synths, evoking relaxed and nostalgic moods.' },
    { id: '32', name: 'Lo-fi', image: 'https://source.unsplash.com/200x200/?lofi-music', color: '#5D6D7E', description: 'Lo-fi is mellow, beat-driven music often used for relaxation, study, or background ambiance.' },
    { id: '33', name: 'World', image: 'https://source.unsplash.com/200x200/?world-music', color: '#27AE60', description: 'World music draws from diverse cultural traditions, fusing global sounds and instruments.' },
    { id: '34', name: 'Afrobeats', image: 'https://source.unsplash.com/200x200/?afrobeats', color: '#E59866', description: 'Afrobeats is a lively West African genre blending traditional rhythms with modern pop influences.' },
    { id: '35', name: 'Salsa', image: 'https://source.unsplash.com/200x200/?salsa-music', color: '#E74C3C', description: 'Salsa is energetic Latin dance music with brass, percussion, and lively rhythms.' },
    { id: '36', name: 'Bollywood', image: 'https://source.unsplash.com/200x200/?bollywood-music', color: '#D35400', description: 'Bollywood music mixes Indian classical, folk, and modern pop, known for its cinematic flair.' },
    { id: '37', name: 'Reggaetón', image: 'https://source.unsplash.com/200x200/?reggaeton', color: '#F1948A', description: 'Reggaetón fuses Latin beats, rap, and dance rhythms, making it a global party favorite.' },
    { id: '38', name: 'Flamenco', image: 'https://source.unsplash.com/200x200/?flamenco', color: '#C0392B', description: 'Flamenco is a passionate Spanish genre combining guitar, singing, and expressive dance.' },
    { id: '39', name: 'Ska', image: 'https://source.unsplash.com/200x200/?ska-music', color: '#2C3E50', description: 'Ska blends Jamaican rhythms with upbeat horns and rock elements, leading to reggae and punk fusions.' },
    { id: '40', name: 'Gospel', image: 'https://source.unsplash.com/200x200/?gospel-music', color: '#1ABC9C', description: 'Gospel is spiritual music rooted in Christian tradition, featuring powerful vocals and choirs.' },
    { id: '41', name: 'Opera', image: 'https://source.unsplash.com/200x200/?opera', color: '#7D3C98', description: 'Opera is a dramatic art form combining orchestral music, theatrical singing, and stage performance.' },
    { id: '42', name: 'Choral', image: 'https://source.unsplash.com/200x200/?choral', color: '#BDC3C7', description: 'Choral music is vocal harmony performed by choirs, spanning sacred, classical, and modern works.' },
    { id: '43', name: 'Bluegrass', image: 'https://source.unsplash.com/200x200/?bluegrass', color: '#B9770E', description: 'Bluegrass is an American folk style with fast banjo, fiddle, and acoustic-driven melodies.' },
    { id: '44', name: 'Funk', image: 'https://source.unsplash.com/200x200/?funk-music', color: '#F39C12', description: 'Funk is groovy and rhythmic, built on syncopated basslines and energetic horn sections.' },
    { id: '45', name: 'Disco-Pop', image: 'https://source.unsplash.com/200x200/?disco-pop', color: '#F5B041', description: 'Disco-Pop merges catchy pop hooks with the danceable energy of disco rhythms.' },
    { id: '46', name: 'K-Rap', image: 'https://source.unsplash.com/200x200/?korean-rap', color: '#BB8FCE', description: 'K-Rap showcases Korean hip-hop with unique flows, cultural influences, and global appeal.' },
    { id: '47', name: 'Electro-pop', image: 'https://source.unsplash.com/200x200/?electropop', color: '#3498DB', description: 'Electro-pop fuses pop melodies with electronic beats, creating bright and modern sounds.' },
    { id: '48', name: 'Britpop', image: 'https://source.unsplash.com/200x200/?britpop', color: '#1F618D', description: 'Britpop is a UK rock movement with catchy choruses and cultural themes, led by bands like Oasis.' },
    { id: '49', name: 'New Age', image: 'https://source.unsplash.com/200x200/?new-age-music', color: '#A3E4D7', description: 'New Age music is serene and meditative, designed for relaxation and spiritual reflection.' },
    { id: '50', name: 'Soundtrack', image: 'https://source.unsplash.com/200x200/?film-score', color: '#566573', description: 'Soundtracks capture cinematic emotions, ranging from orchestral scores to thematic songs.' }
  ];


  getMusicGenreType(id:string){
    let musicGenre = this.categories.find(category => category.id === id);
    if (musicGenre) {
      return musicGenre;
    }else{
      return {} as MusicGenresModel;
    }
  }

}
