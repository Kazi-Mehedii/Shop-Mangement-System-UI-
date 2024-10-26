import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Supplier } from '../../Model/supplier';
import { SupplierService } from '../../Service/supplier.service';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css',
})
export class SuppliersComponent implements OnInit {
  supplierForm!: FormGroup; // for add new supplier

  suppliers: Supplier[] = []; // for holding all suppliers

  selectedSupplier: Supplier | null = null; // for select a supplier or update

  supplierId: number = 0;

  /**
   *
   */
  constructor(
    private supplierService: SupplierService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      contactInfo: ['', Validators.required],
    });

    this.getSuppliers();
    if (this.supplierId) {
      this.getSupplierById(this.supplierId);
    }
  }

  getSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
      },
      error(err) {
        console.error('error fatching to supplier', err);
      },
    });
  }

  selectSupplier(supplier: Supplier): void {
    this.selectedSupplier = supplier;
    this.supplierForm.patchValue(supplier);
  }

  getSupplierById(id: number): void {
    this.supplierService.getSupplierByID(id).subscribe({
      next: (data: Supplier) => {
        this.selectedSupplier = data;
        this.supplierForm.patchValue(data);
      }
    });
  }

  addSupplier(): void {
    if (this.supplierForm.valid) {
      this.supplierService.createSupplier(this.supplierForm.value).subscribe({
        next: () => {
          alert('A Supplier Created Succesfully');
          this.getSuppliers();
          this.supplierForm.reset();
        },
        error(err) {
          alert('Somthing wrong a supplier cant create');
          console.error('faild to create supplier', err);
        },
      });
    }
  }

  updateSupplier(): void {
    if (this.supplierForm.valid && this.selectedSupplier) {
      const updatesupplier = { ...this.selectedSupplier, ...this.supplierForm.value};

      this.supplierService
        .updateSupplier(this.selectedSupplier.id, updatesupplier)
        .subscribe({
          next: () => {
            alert('A Supplier Update Successfully');
            this.supplierForm.reset();
            this.getSuppliers();
          },
          error(err) {
            alert('Somthing wrong a supplier not successfully updated');
            console.error('something wrong supplier not update', err);
          },
        });
    }
  }

  deleteSupplier(id: number): void {
    this.supplierService.deleteSupplier(id).subscribe({
      next: () => {
        this.getSuppliers();
        alert('A Supplier Deleted');
      },
      error(err) {
        console.error('error to delete supplier', err);
      },
    });
  }
}
