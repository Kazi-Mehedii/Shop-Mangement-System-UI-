import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PurchaseService } from '../../../Service/purchase.service';
import { ProductServiceService } from '../../../Service/product-service.service';
import { SupplierService } from '../../../Service/supplier.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../Model/product';
import { Supplier } from '../../../Model/supplier';
import { Purchase } from '../../../Model/purchase';

@Component({
  selector: 'app-purchase-form',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './purchase-form.component.html',
  styleUrl: './purchase-form.component.css',
})
export class PurchaseFormComponent implements OnInit {
  purchaseForm!: FormGroup;
  selectedPurchas: Purchase | null = null;
  puchaseId: number = 0;

  products: Product[] = [];
  suppliers: Supplier[] = [];

  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private purchaseService: PurchaseService,
    private productService: ProductServiceService,
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.purchaseForm = this.fb.group({
      productId: [0, Validators.required],
      supplierId: [0, Validators.required],
      quantity: [0, Validators.required],
      unitPrice: [0, Validators.required],
      purchaseDate: ['', Validators.required],
      purcaseMemoNo: ['', Validators.required],
    });

    this.loadProducts_AND_Suppliers();

    // Check if we are editing an existing purchase
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); // get purchase ID from the route
      if (idParam !== null) {
        const id = +idParam // safely convert to number
        if (!isNaN(id)) { // check if it's a valid number
          this.puchaseId = id;
          this.getPurchaseById(this.puchaseId)
        }
        this.puchaseId = id;
        this.getPurchaseById(this.puchaseId); // load the purchase for editing
      }
    });

  }

  loadProducts_AND_Suppliers(): void {
    this.productService
      .getProducts()
      .subscribe((product) => (this.products = product));
    this.supplierService
      .getSuppliers()
      .subscribe((supplier) => (this.suppliers = supplier));
  }


  selectPurchase(purchase: Purchase): void {
    this.selectedPurchas = purchase;
    this.purchaseForm.patchValue;
  }

  //fill value on form using id
  getPurchaseById(id: number): void {
    this.purchaseService.getPurchaseById(id).subscribe({
      next: (value) => {
        this.selectedPurchas = value;
        this.purchaseForm.patchValue(value); // fill the form with purchase details
      },
      error(err){
        console.error('error text', err);
      }
    });
  }

  addPurchase(): void {
    if (this.purchaseForm.valid) {
      this.purchaseService.createPurchase(this.purchaseForm.value)
      .subscribe({
        next: ()  =>{
          alert('Purchase Added Successfully');
          this.purchaseForm.reset();
        },
        error(err){
          alert('Something Wrong errr')
          console.error('Error Text', err)
        }
      })
    }
  }

  updatePurchase(): void {
    if (this.purchaseForm.valid && this.selectedPurchas) {
      const updateSupplier = {... this.selectedPurchas, ...this.purchaseForm.value}

      this.purchaseService
      .updatePurchase(this.selectedPurchas.id, updateSupplier)
      .subscribe({
        next : () => {
          alert('A purchase is Updated Successfully.');
          this.router.navigate(['/purchases/List']) // navigate back to the purchase list
        },
        error(err) {
          console.error('error Text',err);
        }
        });
    }
  }

  // submitForm(): void {
  //   if (this.purchaseForm.valid) {
  //     const purchasedata = this.purchaseForm.value;
  //     purchasedata.totalPrice = purchasedata.quantity * purchasedata.unitPrice; // Calculate total price


  //     //update purchase
  //     if (this.selectedPurchaseId) {
  //       this.purchaseService
  //         .updatePurchase(this.selectedPurchaseId, purchasedata)
  //         .subscribe({
  //          next: () =>{
  //           alert('Purchase Updated Successfully');
  //           // this.router.navigate(['/purchases']);
  //           this.purchaseForm.reset();
  //          },
  //          error(err){
  //           console.error('Something Wrong purchase not update',err)
  //          }
  //         });
  //     } else {
  //       //add new purchase
  //       this.purchaseService.createPurchase(purchasedata).subscribe({
  //         next: () => {
  //           alert('Purchase Created Successfully');
  //           this.purchaseForm.reset();
  //         },
  //       });
  //     }
  //   }
  // }
}
