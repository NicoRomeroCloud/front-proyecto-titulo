import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopFormMySPlantasService {

  constructor() { }


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
