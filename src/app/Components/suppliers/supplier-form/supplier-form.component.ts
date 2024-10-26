import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Supplier } from '../../../Model/supplier';
import { SupplierService } from '../../../Service/supplier.service';
import { ActivatedRoute,Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-supplier-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './supplier-form.component.html',
  styleUrl: './supplier-form.component.css'
})
export class SupplierFormComponent implements OnInit {

  supplierForm!: FormGroup; // for add new supplier
  selectedSupplier: Supplier | null = null; // for select a supplier or update

  supplierId: number = 0;

  /**
   *
   */
  constructor(
    private supplierService: SupplierService,
    private fb: FormBuilder,
    private   route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      contactInfo: ['', Validators.required],
    })

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.supplierId = +id;
        this.getSupplierById(this.supplierId);
      }
    });
  }

  selectSupplier(supplier: Supplier): void{
    this.selectedSupplier = supplier;
    this.supplierForm.patchValue(supplier);
  }

  getSupplierById(id: number): void {
    this.supplierService.getSupplierByID(id).subscribe({
      next: (data) =>{
        this.selectedSupplier = data;
        this.supplierForm.patchValue(data);
      }
    })
  }

  addSupplier(): void{
    if (this.supplierForm.valid) {
      this.supplierService.createSupplier(this.supplierForm.value).subscribe({
        next: () =>{
          alert('A Supplier Succesfully Created');
          this.supplierForm.reset();
        }
      })
    }
  }

  updateSupplier(): void {
    if (this.supplierForm.valid && this.selectedSupplier) {
      const updateSupplier = {...this.selectedSupplier, ...this.supplierForm.value}     
      this.supplierService.updateSupplier(this.selectedSupplier.id, updateSupplier).subscribe({
        next: () => {
          alert('A Supplier Successfully Updated');
          this.router.navigate(['/supplier/List'])
        },
        error(err) {
          alert('Somthing wrong a supplier not successfully updated');
          console.error('something wrong supplier not update', err);
      }});

    }
  }



}
