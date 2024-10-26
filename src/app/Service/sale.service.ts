import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../Model/Sale/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  saleUrl = 'https://localhost:7265/api/Sale';


  constructor(private http:HttpClient) { }

  getSales(): Observable<Sale[]>{
    return this.http.get<Sale[]>(this.saleUrl)
  }

  getSaleById(id: number): Observable<Sale>{
    return this.http.get<Sale>(`${this.saleUrl}/${id}`)
  } 

  createSale(sale: Sale): Observable<Sale>{
    return this.http.post<Sale>(this.saleUrl,sale);
  }

  updateSale(id: number, sale: Sale){
    return this.http.put(`${this.saleUrl}/${id}`,sale);
  }

  deleteSale(id: number): Observable<void>{
    return this.http.delete<void>(`${this.saleUrl}/${id}`);
  }
}
