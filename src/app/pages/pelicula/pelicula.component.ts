import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast } from 'src/app/interface/credits-response';
import { MovieResponse } from '../../interface/movie-response';
import { PeliculasService } from '../../services/peliculas.service';



@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieResponse;
  public cast: Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               private location: Location,
               private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];
    console.log(id);

    // Busco los detalles de la película

    this.peliculasService.getPeliculaDetalle(id)
        .subscribe(movie =>{
          console.log(movie);
          if(!movie){
            this.router.navigateByUrl('/home');         // lo envío a otra página
            return; // volvemos para que no haga nada
          }
          this.pelicula = movie;

        });

    // Obtengo el casting de los actores
    
     this.peliculasService.getCast(id)
       .subscribe( cast =>{
           console.log(cast);
           this.cast = cast;
         } )
  }

  onRegresar(){
    this.location.back();
  }

}
