export interface productDTO{
    id: string;
    name: string;
    picture: string;
    category: categoryDTO;
    description?: string;
    price: number;
}

export interface categoryDTO{
    id: string;
    name: string
}