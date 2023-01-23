import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private ordenUrl = 'http://localhost:8080/api/orders';

  constructor(private httpClient: HttpClient) { }

  getOrderHistory( theEmail: string): Observable<GetResponseHistory>{

    const order = `${this.ordenUrl}/search/findByCustomerEmail?email=${theEmail}`;

    return this.httpClient.get<GetResponseHistory>(order);

  }


  getOrderHistory2(): Observable<GetResponseHistory>{

    const order = `${this.ordenUrl}/search/findAll`;

    return this.httpClient.get<GetResponseHistory>(order);

  }


}

interface GetResponseHistory{
  _embedded: {
    orders: OrderHistory[];
  }
}
