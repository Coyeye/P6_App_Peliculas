import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { CommonModule } from '@angular/common';
import {ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';
import { ImagenPipe } from 'src/app/pipes/imagen-pipe';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
  standalone: true,
  imports: [CommonModule, ImagenPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlideshowBackdropComponent  implements OnInit {
  @Input() peliculas: Pelicula[] = [];


  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  async verDetalle(id: number){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }

    })
    modal.present();
  }

}
