import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'playlistImgConverter'
})
export class PlaylistImgConverterPipe implements PipeTransform {

  transform(thumbnailPath: string | null | undefined) {
    if (!thumbnailPath) {
      return null
    }
    return `https://cynhadjnrnyzycvxcpln.supabase.co/storage/v1/object/public/playlist-thumbnail/${thumbnailPath}`;
  }

}
