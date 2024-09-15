import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, count, map, Observable, of, tap} from "rxjs";
import {Country} from "../interfaces/country.interface";
import {CacheStore} from "@angular-devkit/build-angular/src/tools/esbuild/cache";
import {CacheStoreInterface} from "../interfaces/cache-store.interface";
import {Region} from "../interfaces/region.tye";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStoreInterface ={
    byCapital: {term:'', countries: []},
    byCountries: {term:'', countries: []},
    byRegion: {region:'', countries: []},

  }; //Almacenar la información de las peticiones

  constructor(private httpClient:HttpClient) {
    this.loadFromLocalStorage();
  }

  getCountriesRequest(paramSearch:string, termSearch: string ): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/${paramSearch}/${termSearch}`)
      //Capturando el error en la petición
      .pipe(
        catchError( error=> {
          console.error('Error en la petición');
          console.error(error);
          return of([]);
        } )
      )
      .pipe(
        tap(
          countries => {
            if(paramSearch === 'capital'){
              this.cacheStore.byCapital = {term: termSearch, countries};
            }
            if (paramSearch === 'name') {
              this.cacheStore.byCountries = {term: termSearch, countries};
            }
            if (paramSearch === 'region') {
              this.cacheStore.byRegion = {region: termSearch as Region, countries};
            }
          }
        ),
        tap(()=> this.saveToLocalStorage()),
      )
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null | undefined> {
    return this.httpClient
      //
      .get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      //Capturando el error en la petición
      .pipe(
        map(countries =>countries.length>0 ? countries[0]: null),
        catchError( error=> {
          console.error('Error en la petición de searchCountryByAlphaCode');
          console.error(error);
          return of(null);
        } )
      );
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    const cacheStore = localStorage.getItem('cacheStore');
    if(!cacheStore){
      return;
    }
    this.cacheStore = JSON.parse(cacheStore);
  }
}
