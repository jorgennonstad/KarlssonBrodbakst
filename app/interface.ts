// Interface for simplified product details
export interface simplifiedProduct {
    _id: string;
    imageUrl: string; // URL for the product image
    price: number; // Current price of the product
    slug: string; // Unique identifier for routing
    categoryName: string; // Name of the product category
    name: string; // Product name
}

// Interface for full product details
export interface fullProduct {
    _id: string; // Unique ID for the product
    images: any; // Array of images associated with the product
    price: number; // Current price of the product
    slug: string; // Unique identifier for routing
    categoryName: string; // Name of the product category
    name: string; // Product name
    description: string; // Detailed description of the product
    price_id: string; // Stripe price ID for the product
}

