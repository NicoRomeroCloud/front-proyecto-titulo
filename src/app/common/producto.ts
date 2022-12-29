import { ProductCategory } from "./product-category";

export class Producto {

                public id: number
                public sku: string
                public category: ProductCategory
                public name: string
                public description: string
                public unitPrice: number
                public imageUrl: string
                public active: boolean
                public unitsInStock: number
                public dateCreated: Date
                public lastUpdated: Date
        

}
