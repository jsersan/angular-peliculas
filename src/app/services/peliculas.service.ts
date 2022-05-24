import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interface/cartelera-response';
import { CreditsResponse } from '../interface/credits-response';
import { MovieResponse } from '../interface/movie-response';



@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: '50dadd4cc349d67261295f7d03041022',
      language: 'es-ES',
      page: this.carteleraPage
    };
  }

  getCartelera(): Observable<Movie[]> {

    console.log("Cargando API");
    console.log(this.cargando);

    if (this.cargando) {
      // Cargando películas
      return of([]);
    }

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: this.params
    }).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false; // En este momento ya tengo una respuesta
      })
    );

  }

  buscarPeliculas(texto: string): Observable<Movie[]> {

    const params = { ...this.params, page: '1', query: texto };

    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
      map(resp => resp.results)
    );
  }

  getPeliculaDetalle(id: string) {
    // https://api.themoviedb.org/3/movie/826749?api_key=0976c2b22dfbf0514acc7ac175a865a8&language=es-ES

    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
      params: this.params
    }).pipe(
      catchError(err=>of(null))
    )

    // En los params está la apikey y el lenguaje
  }

  getCast( id: string){
    // https://api.themoviedb.org/3/movie/438695/credits?api_key=50dadd4cc349d67261295f7d03041022&language=es-ES

    return this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      map( resp=> resp.cast),
      catchError(err=>of([])),
    );
    
    // No me interesa deveolver todo el objato. Solo el casting.
    // En params está la apiKey y el lenguaje.


  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }
}
