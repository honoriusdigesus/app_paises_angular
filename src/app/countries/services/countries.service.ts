import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Country} from "../interfaces/country.interface";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient:HttpClient) { }

  getCountriesRequest(paramSearch:string, capital: string ): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.apiUrl}/${paramSearch}/${capital}`)
      //Capturando el error en la petición
      .pipe(
        catchError( error=> {
          console.error('Error en la petición');
          console.error(error);
          return of([]);
        } )
      );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
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
}
