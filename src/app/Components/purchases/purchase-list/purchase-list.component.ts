import { Component, OnInit } from '@angular/core';
import { Purchase } from '../../../Model/purchase';
import { PurchaseService } from '../../../Service/purchase.service';
import { ProductServiceService } from '../../../Service/product-service.service';
import { SupplierService } from '../../../Service/supplier.service';
import { Router } from '@angular/router';
import { Product } from '../../../Model/product';
import { Supplier } from '../../../Model/supplier';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './purchase-list.component.html',
  styleUrl: './purchase-list.component.css'
})
export class PurchaseListComponent implements OnInit {
 

  purchase : Purchase[] = [];
  products: Product[] = [];
  supplers: Supplier[] =[];

  /**
   *
   */
  constructor(
    private purchaseService: PurchaseService,
    private productService: ProductServiceService,
    private supplierService: SupplierService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.getPurchase();
    this.getProducts();
    this.getSuppliers();
  }

  getPurchase() : void {
    this.purchaseService.getPurchase().subscribe(purchas => this.purchase = purchas)
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  getSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(suppliers => this.supplers = suppliers);
  }

  editPurchase(id: number): void {
    this.router.navigate(['/purchases/edit', id]); // ensure 'edit' route is correct
  }
  
  deletePurchase(id: number): void{
    if(confirm('Are You Sure want to delete this Purchase')){
      this.purchaseService.deletePurchase(id).subscribe({
        next: () => {
          alert('A Purchase Successfully Deleted');
          this.getPurchase();
        },
        error(err) {
          alert('Something Wrong A purchase Not delete');
          console.error('Somthing wrong to delete purchase', err);
        },
      })
    }
  }

  getProductName(productID: number): string {
     const product = this.products.find(p => p.id === productID)
     return product ? product.productName : 'Undefined'
  }

  getSupplierName(supplierId: number): string {
    const supplier = this.supplers.find(s => s.id === supplierId)
    return supplier ? supplier.name : 'Undefined';
  }


}
