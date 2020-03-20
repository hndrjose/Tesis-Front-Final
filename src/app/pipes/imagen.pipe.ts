import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIO } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, ...args: any[]): any {

    let url = URL_SERVICIO + '/verimagen/';

    if (!img) {
      return url + 'xxx';
    }
    return url + img;
  }


}
