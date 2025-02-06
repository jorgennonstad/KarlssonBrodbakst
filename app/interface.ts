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

// Interface for catering items
export interface CateringItem {
    title: string;
    note: string;
    description: string[]; // Assuming it's an array of strings
    price: number;
    image: {
      asset: {
        url: string;
      };
    };
  }
  

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
  maxOrdersPerCustomer: number;
}


// Interface for Popup content (for product info)
export interface PopupContent {
    næringsinnhold: string[];
    allergener: string[];
  }
  
  // Interface for the full product details
  export interface Product {
    _id: string;
    images: { asset: { url: string } }[]; // Assuming images is an array of objects with an asset containing a URL
    price: number;
    name: string;
    description: string;
    price_id: string;
    maxOrdersPerCustomer: number;
    naeringsinnhold: string[]; // Nutritional content
    allergener: string[]; // Allergens
    slug: string;
    categoryName: string;
  }
  

  // Interface for the hero image
export interface HeroImage {
  imageUrl: string;
}

// Interface for employee data
export interface Employee {
  name: string;
  bio: any; // Bio can contain rich text or simple text. If it's rich text, it will be handled via PortableText
  imageUrl: string;
}

// Interface for history data
export interface History {
  title: string;
  content: any; // Rich text content
}

// Interface for page header data
export interface PageHeader {
  title: string;
  subtitle: string;
}
