export type Product = {
    readonly id?: string;
    title: string;
    description: string;
    price: number;
    image: string;
}

export type Stock = {
    product_id: string;
    count: number;
}