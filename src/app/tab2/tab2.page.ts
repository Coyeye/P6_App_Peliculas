import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  ModalController } from '@ionic/angular/standalone';
import { Movies } from '../services/movies';
import { Pelicula } from '../interfaces/interfaces';


import { DetalleComponent } from '../components/detalle/detalle.component';
import { ImagenPipe } from '../pipes/imagen-pipe';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonCol,
    CommonModule,
    IonList,
    IonSearchbar,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonListHeader,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCard,
    ImagenPipe,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
  ]
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Avengers', 'El señor de los anillos', 'La vida es bella'];

  constructor(
    private moviesService: Movies,
    private modalCtrl: ModalController
  ) {}

  buscar(event:any){
    const valor: string = event.detail.value;
    this.textoBuscar = valor;
    this.buscando = true;

    if(valor.length === 0){
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.moviesService.buscarPeliculas(valor)
    .subscribe(resp => {
      console.log(resp);
      this.peliculas = resp['results'];
      this.buscando = false;
    });

  }

  async detalle(id:number){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
