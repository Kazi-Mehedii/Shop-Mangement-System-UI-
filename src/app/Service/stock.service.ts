import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from '../Model/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {


  private stockUrl = 'https://localhost:7265/api/Stock';

  constructor(private http: HttpClient) { }

  getStocks(): Observable<Stock[]>{
    return this.http.get<Stock[]>(this.stockUrl);
  }

  getStockById(id: number): Observable<Stock>{
    return this.http.get<Stock>(`${this.stockUrl}/${id}`);
  }
}
