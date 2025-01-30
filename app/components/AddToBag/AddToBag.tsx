"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../../lib/sanity";
import "./AddToBag.css";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  // Ensure the image is a serializable string (URL)
  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url() ?? "", // Convert image to a plain string (URL)
    price_id,
  };

  const handleAddToCart = () => {
    // Add the item to the cart without passing the event
    addItem({ ...product });
    
    // Optionally call handleCartClick if needed, but ensure it's handled properly
    // handleCartClick(); // Ensure this doesn't receive a synthetic event
  };

  return (
    <Button
      className="add-to-bag"
      onClick={handleAddToCart} // Custom handler
    >
      Legg til handlekurv
    </Button>
  );
}
