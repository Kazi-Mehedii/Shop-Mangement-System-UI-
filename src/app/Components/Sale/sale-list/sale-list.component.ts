import { Component, OnInit } from '@angular/core';
import { Sale } from '../../../Model/Sale/sale';
import { Product } from '../../../Model/product';
import { SaleService } from '../../../Service/sale.service';
import { ProductServiceService } from '../../../Service/product-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sale-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './sale-list.component.html',
  styleUrl: './sale-list.component.css',
})
export class SaleListComponent implements OnInit {
  salse: Sale[] = [];
  products: Product[] = [];

  filteredSales: Sale[] = [];
  searchInvoiceNo: string = '';

  /**
   *
   */
  constructor(
    private saleService: SaleService,
    private productServise: ProductServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSale();
    this.loadProducts();
  }

  loadSale(): void {
    this.saleService.getSales().subscribe({
      next: (value) => {
        this.salse = value;

        // Set filteredSales to display all sales initially
        this.filteredSales = [...this.salse];
      },
      error(err) {
        console.error('error loading sale', err);
      },
    });
  }

  loadProducts(): void {
    this.productServise.getProducts().subscribe({
      next: (value) => {
        this.products = value;
      },
    });
  }

  editSale(id: number): void {
    this.router.navigate(['/salse/updatform', id]);
  }

  deleteSale(saleId: number): void {
    if (confirm('Are You Sure want to delete this sale')) {
      this.saleService.deleteSale(saleId).subscribe({
        next: (value) => {
          alert('Sale Deleted Successfully');
          this.loadSale();
        },
        error(err) {
          alert('something wrong to delete sale');
          console.error('error deleteing sale', err);
        },
      });
    }
  }

  getProductrName(productId: number): string {
    const product = this.products.find((s) => s.id === productId);
    return product ? product.productName : 'Undefined';
  }

  // Filter sales by invoice number
  filterSalse() {
    this.filteredSales = this.salse.filter((sale) =>
      sale.saleInvoiceNo
        .toLowerCase()
        .includes(this.searchInvoiceNo.toLocaleLowerCase())
    );
  }
}
