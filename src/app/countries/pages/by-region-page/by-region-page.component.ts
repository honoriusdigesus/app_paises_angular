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
  public isLoading: boolean = false;

  searchByRegion(region: string ): void {
    this.isLoading = true;
    console.log('Dato recibido en el by-region es: ', region);
    this.receivedValue = region;
    this.countriesServices.getCountriesRequest('region',region)
      .subscribe( countries => {
        this.countries = countries;
        console.log(countries);
        this.isLoading = false;
      });
  }

  constructor(private countriesServices: CountriesService) {}

}
