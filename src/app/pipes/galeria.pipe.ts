import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIO } from '../config/config';

@Pipe({
  name: 'galeria'
})
export class GaleriaPipe implements PipeTransform {

  transform(img: any, ...args: any[]): any {
    let url = URL_SERVICIO + '/vergaleria/';

    if (!img) {
      return url + 'xxx';
    }
    return url + img;
  }

}
