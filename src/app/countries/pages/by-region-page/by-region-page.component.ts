import { Component } from '@angular/core';
import {Country} from "../../interfaces/country.interface";
import {CountriesService} from "../../services/countries.service";

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  receivedValue: string = '';
  public countries: Country[] = [];

  searchByRegion( region: string ): void {
    console.log('Dato recibido en el by-capital es: ', region);
    this.receivedValue = region;
    this.countriesServices.searchRegion(region)
      .subscribe( countries => {
        this.countries = countries;
        console.log(countries);
      });
  }

  constructor(private countriesServices: CountriesService) {}

}
