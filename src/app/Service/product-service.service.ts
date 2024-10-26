import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  productAPI = 'https://localhost:7265/api/Product'

  constructor(private http: HttpClient) { }

  // private getAuthHeaders(){
  //   const token = localStorage.getItem('token');// Get token from localStorage
  //   console.log('Token from localStorage:', token); // Log token for debugging
  //   return new HttpHeaders({
  //     'Authorization' : `Bearer${token}` // Set the Bearer token in headers
  //   });
  // }

  getProducts(): Observable<Product[]>{
    // const headers = this.getAuthHeaders();
    return this.http.get<Product[]>(this.productAPI);
  }

  // getProducts(): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });

  //   return this.http.get(this.productAPI, { headers });
  // }

  addProduct(product: Product): Observable<Product[]>{
    // const headers = this.getAuthHeaders();
    return this.http.post<Product[]>(this.productAPI, product);
  }

  deleteProduct(id: number): Observable<Product[]>{
    // const headers = this.getAuthHeaders();
    return this.http.delete<Product[]>(`${this.productAPI}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Product[]>{
    // const headers = this.getAuthHeaders();
    return this.http.put<Product[]>(`${this.productAPI}/${id}`, product)
  }
}
