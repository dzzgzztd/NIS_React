export interface Product {
    id: string;
    name: string;
    description: string;
    category?: string;
    quantity: number;
    unit: string;
    image?: string;
    price: number;
}
