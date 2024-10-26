import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../Model/product';
import { ProductServiceService } from '../../Service/product-service.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  
  
  productForm!: FormGroup;
  products: Product[] = [];

  /**
   *
   */
  constructor(private productService: ProductServiceService, private fb: FormBuilder) { 
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
    });
   }
  
  
  ngOnInit(): void {
   
    this.getProducts();
  }

  getProducts(): void{
    this.productService.getProducts().subscribe({
      next: (data) =>{
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });
  }

  addProducts(): void{
   if(this.productForm.valid){
    this.productService.addProduct(this.productForm.value).subscribe({
      next: () =>{
        alert('Product Added Succesfully');
        this.getProducts();
        this.productForm.reset();
        
      },
      error:(err) => {
        alert('something Wrong Product Not successfully Added');
        console.error('Error Adding Product', err)
      }
    })
   }
  }



}
