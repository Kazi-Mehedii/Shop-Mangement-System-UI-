import { Routes, CanActivate } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ProductsComponent } from './Components/products/products.component';
import { StockComponent } from './Components/stock/stock.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { PurchaseFormComponent } from './Components/purchases/purchase-form/purchase-form.component';
import { PurchaseListComponent } from './Components/purchases/purchase-list/purchase-list.component';
import { SalesFormComponent } from './Components/Sale/sales-form/sales-form.component';
import { SaleListComponent } from './Components/Sale/sale-list/sale-list.component';
import { SupplierFormComponent } from './Components/suppliers/supplier-form/supplier-form.component';
import { SupplierListComponent } from './Components/suppliers/supplier-list/supplier-list.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './Guard/auth.guard';


export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },

  {path:'login', component: LoginComponent},

  { path: 'stock', component: StockComponent },
  { path: 'reports', component: ReportsComponent },
  // Add other routes here


  //routes for all supplier link
  { path: 'suppliers', component: SupplierFormComponent },
  {path: 'supplier/new', component: SupplierFormComponent},
  {path: 'supplier/List', component: SupplierListComponent},
  {path: 'supplier/edit/:id', component: SupplierFormComponent},
  

  // routes for all purchase link
  { path: 'purchases', component: PurchaseFormComponent },
  { path: 'purchases/List', component: PurchaseListComponent },
  { path: 'purchases/new', component: PurchaseFormComponent },
  { path: 'purchases/edit/:id', component: PurchaseFormComponent },

  //routes for all sale link
  { path: 'sales', component: SalesFormComponent },
  { path: 'sale/new', component: SalesFormComponent },
  { path: 'sale/List', component: SaleListComponent },
  {path: 'salse/updatform/:id', component: SalesFormComponent},
  

  { path: '', redirectTo: '/sales', pathMatch: 'full' }, // Default route
];
