import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl: string;
    uniPrice: number;
    quantity: number;
    productId: number;

    constructor(cartitem: CartItem){
        this.imageUrl = cartitem.imageUrl;
        this.quantity = cartitem.quantity;
        this.uniPrice = cartitem.unitPrice;
        this.productId = cartitem.id;
    }
}
