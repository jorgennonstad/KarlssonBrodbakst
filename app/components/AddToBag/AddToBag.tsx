"use client";

import { useState } from "react";
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
  maxOrdersPerCustomer: number;
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
  maxOrdersPerCustomer, // ✅ Use this directly instead of fetching it
}: ProductCart) {
  const { addItem, cartDetails } = useShoppingCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleAddToCart = () => {
    const productInCart = cartDetails?.[price_id];

    // ✅ Use maxOrdersPerCustomer from props instead of querying
    if (productInCart?.quantity >= maxOrdersPerCustomer) {
      setPopupMessage(`Du kan kun bestille maks ${maxOrdersPerCustomer} av dette produktet i dag.`);
      setIsPopupOpen(true);
      return;
    }

    addItem({
      name,
      description,
      price,
      currency,
      image: urlFor(image).url() ?? "",
      price_id,
      maxOrdersPerCustomer,
    });
  };

  return (
    <>
      <Button className="add-to-bag" onClick={handleAddToCart}>
        Legg til handlekurv
      </Button>

      {/* Styled Quantity Limit Popup */}
      {isPopupOpen && (
        <div className="popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-header">Begrensning</h3>
            <p className="popup-message">{popupMessage}</p>
            <button className="close-popup" onClick={() => setIsPopupOpen(false)}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}
