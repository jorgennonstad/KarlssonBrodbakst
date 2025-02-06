"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../../lib/sanity";
import { ProductCart } from "../../interface"; // Importing the interface
import "./AddToBag.css";

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
  maxOrdersPerCustomer,
}: ProductCart) {
  const { addItem, cartDetails } = useShoppingCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleAddToCart = () => {
    const productInCart = cartDetails?.[price_id];

    // Make sure productInCart and quantity exist and quantity is a valid number
    if (productInCart?.quantity && productInCart.quantity >= maxOrdersPerCustomer) {
      setPopupMessage(`Du kan kun bestille ${maxOrdersPerCustomer} av denne varen om gangen. Hvis du ønsker å bestille flere, kan du kontakte oss via e-post.`);
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
