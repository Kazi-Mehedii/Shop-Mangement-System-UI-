import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../Model/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  supplierApi = 'https://localhost:7265/api/Supplier';

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.supplierApi);
  }

  getSupplierByID(id: number): Observable<any>{
    return this.http.get<any>(`${this.supplierApi}/${id}`)
  }

  createSupplier(supplier: Supplier): Observable<Supplier[]>{
    return this.http.post<Supplier[]>(this.supplierApi,supplier)
  }

  updateSupplier(id: number, supplier: Supplier): Observable<Supplier[]>{
    return this.http.put<Supplier[]>(`${this.supplierApi}/${id}`,supplier)
  }

  deleteSupplier(id: number): Observable<Supplier[]>{
    return this.http.delete<Supplier[]>(`${this.supplierApi}/${id}`)
  }
}
