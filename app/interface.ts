import { PortableTextBlock } from "next-sanity";

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
  images: { asset: { url: string } }[]; // Array of image objects, each with an asset containing the URL
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
  description: string[]; // Array of strings for description
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
  image: any;  // Allow either a string or a structured object
  price_id: string;
  maxOrdersPerCustomer: number;
}


// Interface for Popup content (for product info)
export interface PopupContent {
  næringsinnhold: string[];
  allergener: string[];
}

// Interface for full product details
export interface Product {
  _id: string; // Unique ID for the product
  images: { 
    asset: { 
      _ref: string;  // Add _ref field to the image object
      url: string; 
    } 
  }[]; // Array of image objects, each with an asset containing the _ref and url properties
  price: number; // Current price of the product
  slug: string; // Unique identifier for routing
  categoryName: string; // Name of the product category
  name: string; // Product name
  description: string; // Detailed description of the product
  price_id: string; // Stripe price ID for the product
  maxOrdersPerCustomer: number; // Maximum number of orders per customer
  naeringsinnhold: string[]; // Nutritional content
  allergener: string[]; // Allergens
}


// Interface for the hero image
export interface HeroImage {
  imageUrl: string;
}

// Interface for employee data
export interface Employee {
  name: string;
  bio: PortableTextBlock[]; // Assuming bio is a string, you could use other types for rich text if needed
  imageUrl: string;
}

// Interface for history data
export interface History {
  title: string;
  content: PortableTextBlock[]; // Assuming content is a string, you could use a more complex type like PortableText if it's rich text
}

// Interface for page header data
export interface PageHeader {
  title: string;
  subtitle: string;
}

export interface KontaktData {
  title: string;
  description: string;
  phone: string;
  email: string;
  address: string;
}
