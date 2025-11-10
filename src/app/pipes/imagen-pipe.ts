import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.imgPath;


@Pipe({
  name: 'imagen',
  standalone: true
})
export class ImagenPipe implements PipeTransform {

  transform(img: string | null | undefined, size: string = 'w500'): string {
    if (!img) {
      return './assets/no-image-baner.jpg';
    }

    const imgUrl = `${URL}/${size}${img}`;
    //console.log("URL: ",imgUrl);

    return imgUrl;
  }

}
