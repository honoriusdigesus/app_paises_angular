import {Component, OnInit, Output} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../interfaces/country.interface";

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit {

  receivedValue: string = '';
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  searchByCountry(country: string ): void {
    this.isLoading = true;
    console.log('Dato recibido en el by-country es: ', country);
    this.receivedValue = country;
    this.countriesServices.getCountriesRequest('name', country)
      .subscribe( countries => {
        this.countries = countries;
        console.log(countries);
        this.isLoading = false;
      });
  }

  constructor(private countriesServices: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesServices.cacheStore.byCountries.countries;
    this.initialValue = this.countriesServices.cacheStore.byCountries.term;
    }

}
