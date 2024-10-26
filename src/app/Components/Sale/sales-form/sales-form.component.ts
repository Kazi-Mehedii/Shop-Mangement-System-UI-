import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Sale } from '../../../Model/Sale/sale';
import { Product } from '../../../Model/product';
import { SaleService } from '../../../Service/sale.service';
import { ProductServiceService } from '../../../Service/product-service.service';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sales-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sales-form.component.html',
  styleUrl: './sales-form.component.css',
})
export class SalesFormComponent implements OnInit {
  saleForm!: FormGroup;
  saleItems!: FormArray;
  saleId: number | null = null;
  products: Product[] = [];

  /**
   *
   */

  constructor(
    private saleService: SaleService,
    private productServise: ProductServiceService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.saleForm = this.fb.group({

      id:[0],

      saleDate: ['', Validators.required],

      saleInvoiceNo: ['', Validators.required],

      saleItems: this.fb.array([]), // Dynamic product array
    });

    this.saleItems = this.saleForm.get('saleItems') as FormArray;

    this.loadProducts();

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.saleId = +id;
        this.getSaleById(this.saleId);
      }
    });
  }

  get saleItemsControl() {
    return this.saleItems.controls;
  }

  addProducts() {
    const newProduct = this.fb.group({
      productId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      totalAmount: [{ value: 0 }],
    });

    // Get the current index for the newly added product
    const index = this.saleItems.length;

    // Subscribe to value changes for quantity and price
    newProduct
      .get('quantity')
      ?.valueChanges.subscribe(() => this.claculateTotal(index));
    newProduct
      .get('price')
      ?.valueChanges.subscribe(() => this.claculateTotal(index));

    this.saleItems.push(newProduct);
  }

  claculateTotal(index: number) {
    const product = this.saleItems.at(index);
    const quantity = product.get('quantity')?.value || 0;
    const price = product.get('price')?.value || 0;
    const total = quantity * price;
    product.get('totalAmount')?.setValue(total, { emitEvent: false });
  }

  removeProduct(index: number) {
    this.saleItems.removeAt(index);
  }

  submitSale() {
    if (this.saleForm.valid) {
      const saleData: Sale = this.saleForm.value;

      console.log('Sale Data:', saleData);

      if (this.saleId) {
        this.saleService.updateSale(this.saleId, saleData).subscribe({
          next: () => {
            alert('Sales Successfully Updated');
            this.router.navigate(['/sale/List']);
          },
          error(err) {
            console.error('Somthing wrong', err);
            alert('Something wrong cant update');
          },
        });
      } else {
        this.saleService.createSale(saleData).subscribe({
          next: () => {
            alert('Salse Successfully Created');
            this.printCashMemo();
            this.saleForm.reset();
            this.saleItems.clear();
            // this.router.navigate(['/sale/List']);
          },
          error(err) {
            alert('The Product Not Available in stock');
            console.error('somthing wrong to create sale', err);
          },
        });
      }
    }
  }

  private getSaleById(id: number): void {
    this.saleService.getSaleById(id).subscribe((sale) => {
      this.saleForm.patchValue({
        id: sale.id,
        saleDate: sale.saleDate,
        saleInvoiceNo: sale.saleInvoiceNo,
      });

      // Clear the saleItems FormArray before patching it
      this.saleItems.clear();

      // Patch each sale item into the form
      sale.saleItems.forEach((item) => {
        this.saleItems.push(
          this.fb.group({
            productId: [item.productId, Validators.required],
            quantity: [item.quantity, [Validators.required, Validators.min(1)]],
            price: [item.price, [Validators.required, Validators.min(0)]],
            totalAmount: [{ value: item.totalAmount, disabled: true }],
          })
        );
      });
    });


  }

  // printCashMemo(): void {
  //   // Ensure the products array is fully loaded

  //   const windowprt = window.open('', '', 'width=900,height=650');
  //   if (windowprt) {
  //     windowprt.document.write(
    
          
  //         <html>
  //             <head>
  //         <style>
  //           body {
  //             font-family: Arial, sans-serif;
  //           }
  //           table {
  //             width: 100%;
  //             border-collapse: collapse;
  //           }
  //           th, td {
  //             border: 1px solid black;
  //             padding: 8px;
  //             text-align: left;
  //           }
  //         </style>
  //       </head>
  //            <body>
  //        `;

  //     // Loop through saleItems and generate rows for each product
  //     this.saleForm.value.saleItems.forEach((item: any) => {
  //       const productName = this.getProductrName(item.id);
  //       printContent += `
  //       <tr>
  //         <td>${productName}</td>
  //         <td>${item.quantity}</td>
  //         <td>${item.price}</td>
  //         <td>${item.totalAmount}</td>
  //       </tr>`;
  //     });

  //     printContent += `
  //           </tbody>
  //         </table>
  //       </body>
  //     </html>`;
  //     windowprt.document.write(printContent);
  //     windowprt.document.close();
  //     windowprt.focus();
  //     windowprt.print();
  //     windowprt.close();
  //   }
  // }

  loadProducts(): void {
    this.productServise.getProducts().subscribe({
      next: (value) => {
        this.products = value;
      },
    });
  }

  getProductrName(productId: number): string {
    const product = (this.products||[]).find((s) => s.id == productId);
    // console.log("Products",this.products)
    // console.log("Product",product)
    return product ? product.productName : 'Undefined';
  }


  printCashMemo(): void {
    // Ensure the products array is fully loaded
  
    const windowprt = window.open('', '', 'width=900,height=650');
    if (windowprt) {
      // windowprt.document.write(
      let printContent = `
          
          <html>
              <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
             <body>
          <h3>Invoice</h3>
          <p>Date: ${this.saleForm.value.saleDate}</p>
          <p>Invoice No: ${this.saleForm.value.saleInvoiceNo}</p>
          <table class="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>`;
  
      // Loop through saleItems and generate rows for each product
      this.saleForm.value.saleItems.forEach((item: any) => {
        const productName = this.getProductrName(item.productId);
        printContent += `
        <tr>
          <td>${productName}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
          <td>${item.totalAmount}</td>
        </tr>`;
      });
  
      printContent += `
            </tbody>
          </table>
        </body>
      </html>`;
      windowprt.document.write(printContent);
      windowprt.document.close();
      windowprt.focus();
      windowprt.print();
      windowprt.close();
    }
  }

}



