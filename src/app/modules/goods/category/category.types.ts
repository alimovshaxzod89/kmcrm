export interface Category
{
    id: number;
    // category?: string;
    name: string;

    purchase_unit_id: number;
    unit_id: number;

    note: string;

    // description?: string;
    // tags?: string[];
    // sku?: string | null;
    // barcode?: string | null;
    // brand?: string | null;
    // vendor: string | null;
    // stock: number;
    // reserved: number;
    // cost: number;
    // basePrice: number;
    // taxPercent: number;
    // price: number;
    // weight: number;
    // thumbnail: string;
    // images: string[];
    // active: boolean;
}

export interface InventoryPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}

export interface Unit
{
    id: string;
    name: string;
}
