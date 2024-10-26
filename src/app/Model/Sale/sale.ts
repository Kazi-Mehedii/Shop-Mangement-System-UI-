import { SaleItem } from "./sale-item";

export class Sale {

    id!: number;

    saleDate!: Date;

    saleInvoiceNo!: string;
    
    saleItems!: SaleItem[];

    

    
}
