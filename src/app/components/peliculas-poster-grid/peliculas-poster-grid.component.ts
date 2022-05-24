import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interface/cartelera-response';


@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.scss']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input()
  movies: Movie[] = [];

  constructor( private router: Router) { }

  ngOnInit(): void {
    console.log(this.movies);
  }

  onMovieClick( movie: Movie){
    console.log(movie);
    this.router.navigate(['/pelicula',movie.id])
  }

}
