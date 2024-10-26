
export class Purchase {

    id!: number;
    productId!: number;
    supplierId!: number;
    quantity!: number;
    unitPrice!: number;
    purchaseDate!: Date;
    purcaseMemoNo!: string;
    totalPrice?: number;

}
