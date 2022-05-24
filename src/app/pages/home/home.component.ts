import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interface/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  public movies: Movie[]= [];
  public moviesSlideshow: Movie[]= [];

  @HostListener('window:scroll', ['$event'])

  onScroll(){
    const pos=(document.documentElement.scrollTop ||document.body.scrollTop) + 1200;
    const max = (document.documentElement.scrollHeight ||document.body.scrollHeight);

    if(pos>max){
      // Llamar al servicio
      console.log('Llamar al servicio');

      if(this.peliculasService.cargando ){
        return;      // No tiene que seguir cargando
      }

      this.peliculasService.getCartelera()
        .subscribe(movies =>{
          this.movies.push(...movies);

        });

    }
  }

  constructor( private peliculasService: PeliculasService){}

  ngOnInit(): void {

    // getCartelera

    this.peliculasService.getCartelera()
    .subscribe( movies => {

      this.movies = movies;
      this.moviesSlideshow = movies;
    })

  }

  ngOnDestroy(): void {
      this.peliculasService.resetCarteleraPage();
  }

}
