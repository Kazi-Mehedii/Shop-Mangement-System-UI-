import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../../Model/supplier';
import { SupplierService } from '../../../Service/supplier.service';
import { Router,RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css'
})
export class SupplierListComponent implements OnInit{

  suppliers: Supplier[] = [];

  searchSupplierName: string = '';

  filterdsupplier: Supplier[] = [];
  

  /**
   *
   */
  constructor( 
    private supplierService: SupplierService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(): void{
    this.supplierService.getSuppliers().subscribe({
      next:(value) => {
        this.suppliers = value;
        this.filterdsupplier = this.suppliers
      },
    })
  }

  editSupplier(id: number){
    this.router.navigate(['/supplier/edit',id]);
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

  filterSupplier() {
      this.filterdsupplier = this.suppliers.filter(supplr => {
        const supplier = this.suppliers.find(s => s.id === supplr.id)
        return supplier ?.name.toLowerCase().includes(this.searchSupplierName.toLowerCase());
      });
  }


}
