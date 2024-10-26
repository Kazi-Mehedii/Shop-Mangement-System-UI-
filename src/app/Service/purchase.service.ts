import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../Model/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  purchaseUrl = 'https://localhost:7265/api/Purchase';
  constructor(private http: HttpClient) { }

  getPurchase(): Observable<Purchase[]>{
    return this.http.get<Purchase[]>(this.purchaseUrl);
  }

  getPurchaseById(id: number): Observable<any>{
    return this.http.get<any>(`${this.purchaseUrl}/${id}`);
  } 

  createPurchase(purchase: Purchase): Observable<Purchase[]>{
    return this.http.post<Purchase[]>(this.purchaseUrl,purchase);
  }

  updatePurchase(id: number, purchase: any): Observable<any[]>{
    return this.http.put<Purchase[]>(`${this.purchaseUrl}/${id}`,purchase)
  } 

  deletePurchase(id: number): Observable<void>{
    return this.http.delete<void>(`${this.purchaseUrl}/${id}`);
  }
}
