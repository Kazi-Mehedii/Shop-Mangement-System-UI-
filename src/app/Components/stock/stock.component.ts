import { Component, OnInit } from '@angular/core';
import { StockService } from '../../Service/stock.service';
import { Stock } from '../../Model/stock';
import { Product } from '../../Model/product';
import { ProductServiceService } from '../../Service/product-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {

  stocks: Stock[] = [];
  // stockId: Stock | null = null;
  products: Product[] = [];

  filterdStcok : Stock[] = [];

  searchProductName: string = '';

  /**
   *
   */
  constructor(private stockService: StockService, private productService: ProductServiceService) { }


  ngOnInit(): void {
    this.getStocks();
    this.getProducts();
  }

  getStocks(): void{
    this.stockService.getStocks().subscribe({
      next: (data) => {
        this.stocks = data;
        this.filterdStcok = [...this.stocks]; // Initialize filtered stock list
      },error(err){
        console.error('error stock fetch', err)
      }
    })
  }

  // getStockById(id: number): void{
  //   this.stockService.getStockById(id).subscribe({
  //     next: (data) => {
  //       this.stockId = data;
  //     }
  //   })
  // }

  getProducts(): void{
      this.productService.getProducts().subscribe({
        next: (data) =>{
          this.products = data;
        }
      })
  }

  getProductName(productid: number): string {
    const product = this.products.find(s => s.id === productid)
    return product ? product.productName: 'Undifined';
  } 

  filterStock() {
    if (this.searchProductName.trim() === ''){
      this.filterdStcok = [...this.stocks];  // Reset filtered stocks if search is empty
    }
    else{
    this.filterdStcok = this.stocks.filter(stock => {
      const product = this.products.find(p => p.id === stock.productId)
      return product?.productName.toLowerCase().includes(this.searchProductName.toLowerCase());
    });
  }

}
}
