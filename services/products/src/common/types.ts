export type Product = {
    readonly id?: string;
    title: string;
    description: string;
    price: number;
    image: string;
    count: number;
}

export type Stock = {
    product_id: string;
    count: number;
}