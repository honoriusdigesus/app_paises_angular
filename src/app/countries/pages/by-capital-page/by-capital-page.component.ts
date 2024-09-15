import {Component, Output} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../interfaces/country.interface";

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService:CountriesService) {}
  receivedValue: string = '';

  searchByCapital(capital: string  ): void {

    console.log('Dato recibido en el by-capital es: ', capital);
    this.receivedValue = capital;
    this.countriesService.getCountriesRequest('capital',capital)
      .subscribe( countries => {
        this.countries = countries;
        console.log(countries);
      });
  }
}
