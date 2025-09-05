import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgConverter'
})
export class ImgConverterPipe implements PipeTransform {

  transform(thumbnailPath: string | null | undefined) {
    if (!thumbnailPath) {
      return null
    }
    return `https://cynhadjnrnyzycvxcpln.supabase.co/storage/v1/object/public/thumbnail/${thumbnailPath}`;
  }

}
