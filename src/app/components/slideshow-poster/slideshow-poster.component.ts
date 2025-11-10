import { CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pelicula, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ImagenPipe } from 'src/app/pipes/imagen-pipe';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
  standalone: true,
  imports: [CommonModule, ImagenPipe, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlideshowPosterComponent  implements OnInit {
  @Input() peliculas: (Pelicula | PeliculaDetalle)[] = [];


  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async verDetalle(id: number | undefined){
    if(!id) {
      return;
    }
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }

    })
    modal.present();
  }

}
