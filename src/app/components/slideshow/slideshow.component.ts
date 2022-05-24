import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interface/cartelera-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input()
  movies: Movie[] = [];

  public mySwiper!: Swiper;

  constructor() { }

  ngAfterViewInit(): void {

    this.mySwiper = new Swiper('.swiper-container', {
        loop: true,
    });

  }

  ngOnInit(): void {

    console.log(this.movies);
  }

  onSlideNext(){
    this.mySwiper.slideNext();
  }

  onSlidePrevious(){
    this.mySwiper.slidePrev();
    
  }
}