export interface Iseller {
    id: number;
    sellername: string;
    currencies: i1[];
    offices: i1[];
    biddedDeals: string;
    guarntDeals: string;
    sellerActDate?: string;
    contactName?: string;
    emailAdd?: string;
}

export interface i1 {
    id:    number;
    itemName: string;
}
