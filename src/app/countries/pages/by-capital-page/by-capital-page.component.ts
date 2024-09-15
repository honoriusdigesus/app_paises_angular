import {Component, OnInit, Output} from '@angular/core';
import {CountriesService} from "../../services/countries.service";
import {Country} from "../../interfaces/country.interface";

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService:CountriesService) {}

  receivedValue: string = '';
  public initialValue: string = '';

  searchByCapital(capital: string  ): void {
    this.isLoading = true;
    console.log('Dato recibido en el by-capital es: ', capital);
    this.receivedValue = capital;
    this.countriesService.getCountriesRequest('capital',capital)
      .subscribe( countries => {
        this.countries = countries;
        console.log(countries);
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }
}
