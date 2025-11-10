import { Movies } from './../../services/movies';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { ModalController } from "@ionic/angular";
import { addIcons } from 'ionicons';
import { thumbsUp, contract, arrowBack, starOutline, star } from 'ionicons/icons';
import { SlicePipe, CommonModule } from '@angular/common';
import { DataLocal } from 'src/app/services/data-local';
import { ImagenPipe } from 'src/app/pipes/imagen-pipe';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  imports: [ ImagenPipe, SlicePipe, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetalleComponent  implements OnInit {
  @Input() id: any;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star-outline';




  constructor(
    private MoviesService: Movies,
    private modalCtrl: ModalController,
    private dataLocal: DataLocal
  ) {
    addIcons({ thumbsUp, contract, arrowBack, starOutline, star });
  }

ngOnInit() {
    this.dataLocal.existePelicula(this.id)
    .then(existe => this.estrella = (existe) ? 'star' : 'star-outline');


    //console.log("id", this.id);
    this.MoviesService.getPeliculaDetalle(this.id)
    .subscribe(resp => {
      this.pelicula = resp;
    });

    this.MoviesService.getActoresPelicula(this.id)
    .subscribe(resp => {
      this.actores = resp.cast;
    });
  }



  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    const existe = this.dataLocal.guardarPelicula(this.pelicula);
    this.estrella = (existe) ? 'star' : 'star-outline';
  }

}
