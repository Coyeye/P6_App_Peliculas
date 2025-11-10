import { Movies } from './../services/movies';
import { Component, OnInit } from '@angular/core';
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { SlideshowPosterComponent } from '../components/slideshow-poster/slideshow-poster.component';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocal } from '../services/data-local';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow,
    IonContent,
    IonGrid,
    SlideshowPosterComponent,
    CommonModule,
    IonRow,
    IonCol
  ],
})
export class Tab3Page{
  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favoritoGenero: any[] = [];


  constructor(
    private dataLocal: DataLocal,
    private moviesService: Movies
  ) {}


  async ionViewWillEnter(){
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);
    this.pelisPorGenero(this.generos, this.peliculas);
  }


  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]){
    this.favoritoGenero = [];
    generos.forEach(genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
          return peli.genres?.find(genre => genre.id === genero.id);
        })
      });
    });
    console.log(this.favoritoGenero);
  }
}
