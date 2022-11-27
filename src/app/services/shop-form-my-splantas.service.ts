import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from "rxjs";
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormMySPlantasService {

  private countriesUrl = 'http://localhost:8080/api/countries';

  private statesUrl = 'http://localhost:8080/api/states';

  constructor( private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]>{

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries) 
    );

  }

  getStates(theCountryCode: string): Observable<State[]>{


    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;


    return this.httpClient.get<GetResponseState>(searchStatesUrl).pipe(
      map(response => response._embedded.states) 
    );

  }


  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
      
     
    }
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{

    let data: number[] = [];

    //matriz para la lista desplegable del año
    //comenzamos por el año actual y se continua durante los proximos 10 años

    const starYear: number = new Date().getFullYear();
    const endYear: number = starYear + 10;

    for(let theYear = starYear; theYear <= endYear; theYear++){
      data.push(theYear);

    }

    return of(data);

  }




}

interface GetResponseCountries{
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseState{
  _embedded:{
    states: State[];
  }
}