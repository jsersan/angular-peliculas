import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform(poster: string): string {

    // Si poster existe, muestra la imagen del mismo. Si no una por defecto no-image.jpg

    if( poster){
        return `https://image.tmdb.org/t/p/w500${poster}`; 
    } else {
      // No tengo la imagen
        return './assets/no-image.jpg'
    }

  }

}
