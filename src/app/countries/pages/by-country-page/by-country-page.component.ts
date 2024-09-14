import {Component, Output} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../interfaces/country.interface";

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  receivedValue: string = '';
  public countries: Country[] = [];

  searchByCountry( country: string ): void {
    console.log('Dato recibido en el by-country es: ', country);
    this.receivedValue = country;
    this.countriesServices.searchCountry(country)
      .subscribe( countries => {
        this.countries = countries;
        console.log(countries);
      });
  }

  constructor(private countriesServices: CountriesService) {}

}
