import { ModalController} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { DetalleComponent } from '../detalle/detalle.component';
import { ImagenPipe } from 'src/app/pipes/imagen-pipe';
import { ParesPipe } from 'src/app/pipes/pares-pipe';



@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
  standalone: true,
  imports: [CommonModule, ImagenPipe, ParesPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlideshowParesComponent  implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();




  constructor(
    private modalCtrl: ModalController
  ) {
        addIcons({ add });
  }

  ngOnInit() {

  }

  onClick(){
    this.cargarMas.emit();

  }

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
