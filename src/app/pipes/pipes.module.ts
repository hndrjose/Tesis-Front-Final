import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { GaleriaPipe } from './galeria.pipe';


@NgModule({
  declarations: [ ImagenPipe, GaleriaPipe ],
  imports: [],
  exports: [ ImagenPipe, GaleriaPipe ]
})
export class PipesModule { }
