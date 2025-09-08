import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lyricsConverter'
})
export class LyricsConverterPipe implements PipeTransform {

  transform(filePath: string | null | undefined): string | null {
    if (!filePath) {
      return null;
    }else{
      return `https://cynhadjnrnyzycvxcpln.supabase.co/storage/v1/object/public/lyrics/${filePath}/lyrics.txt`;
    }
  }

}
