import { Injectable } from '@angular/core';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root',
})
export class DataLocal {

  peliculas: PeliculaDetalle[] = [];


  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
    //private toastController: ToastController
  ) {
    this.init();
    this.cargarFavoritos();
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    })
  }

  guardarPelicula(pelicula: PeliculaDetalle){
    let existe = false;
    let mensaje = '';


    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if(existe){
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = "removido de favoritos"
    }else{
      this.peliculas.push(pelicula);
      mensaje = "agregado a favoritos"
    }

    this.presentToast(mensaje);
    this.storage['set']('peliculas', this.peliculas);

    return !existe;
  }

  // 2. Crea esta función asíncrona
  async init() {
    // Espera a que la base de datos esté lista antes de hacer nada
    await this.storage.create();
  }

  async cargarFavoritos(){
    const peliculas = await this.storage['get']('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id: number){
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);
    return (existe) ? true : false;
  }


}
