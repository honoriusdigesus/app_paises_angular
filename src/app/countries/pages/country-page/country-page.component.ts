import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CountriesService} from "../../services/countries.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit {
  constructor(
    private activatedRouter: ActivatedRoute,
              private countriesService: CountriesService,
              private router: Router
              ) {
  }

  ngOnInit(): void {
       this.activatedRouter
         .params
         .pipe(switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id)))
         .subscribe(
           (country)=> {
             if (!country) {
               this.router.navigateByUrl('/home');
             }
             console.log('Tenemos un país: ', country);
           }
         );
    }
}
