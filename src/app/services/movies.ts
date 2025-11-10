import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditosDetalles, Genre, Pelicula, PeliculaDetalle, RespuestaTMDB } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;
const language = 'es';
const include_image_languaje = 'es';


@Injectable({
  providedIn: 'root',
})
export class Movies {
  private popularesPage = 0;
  generos: Genre[] = [];



  constructor(private http: HttpClient) {
    console.log('Hello Movies Provider');

  }

  private ejecutarQuery<T>(query: string){
    query = URL + query;
    query += `&api_key=${apiKey}&language=${language}&include_image_language=${include_image_languaje}`;

    //console.log(query);

    return this.http.get<T>(query);
  }

  getPopulares(){
    this.popularesPage++;
    const query: string = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaTMDB>(query);
  }

  getFeature(){
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;
    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaTMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${fin}`);
  }

  getPeliculaDetalle(id: number){
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: number){
    return this.ejecutarQuery<CreditosDetalles>(`/movie/${id}/credits?a=1`);
  }

  buscarPeliculas(texto: string){
    return this.ejecutarQuery<RespuestaTMDB>(`/search/movie?query=${texto}`);
  }

  cargarGeneros(): Promise<Genre[]>{

    return new Promise(resolve => {

      this.ejecutarQuery<any>(`/genre/movie/list?a=1`)
      .subscribe(resp => {
        this.generos = resp['genres'];
        console.log(this.generos);
        resolve(this.generos);
      });

    });
  }
}
