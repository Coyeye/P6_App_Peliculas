import { Pelicula } from './../interfaces/interfaces';
import { Movies } from './../services/movies';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackdropComponent } from '../components/slideshow-backdrop/slideshow-backdrop.component';
import { SlideshowParesComponent } from '../components/slideshow-pares/slideshow-pares.component';
import { SlideshowPosterComponent } from '../components/slideshow-poster/slideshow-poster.component';
//import { ComponentsModule } from "../components/components-module";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SlideshowBackdropComponent,
     SlideshowParesComponent,
     SlideshowPosterComponent
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class Tab1Page implements OnInit {
  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];


  constructor(private movieService: Movies) {}


  ngOnInit(): void {
    this.movieService.getFeature()
    .subscribe( movies => {
      this.peliculasRecientes = movies.results;
    });

    // this.movieService.getPopulares()
    // .subscribe( movies => {
    //   this.populares = movies.results;
    // });
    this.getPopulares();
  }

  cargarMas(){
    this.getPopulares();

  }

  private getPopulares(){
    this.movieService.getPopulares()
    .subscribe( movies => {
      const arrtemp = [];
      arrtemp.push(...this.populares);
      arrtemp.push(...movies.results);

      this.populares = arrtemp;
      //this.populares = movies.results;
    });
  }
}
