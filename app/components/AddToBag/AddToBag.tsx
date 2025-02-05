"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { client } from "@/app/lib/sanity";
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
  maxOrdersPerCustomer,
}: ProductCart) {
  const { addItem, cartDetails } = useShoppingCart();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const fetchMaxLimit = async (priceId: string) => {
    const query = `*[_type == "product" && price_id == $priceId][0]{maxOrdersPerCustomer}`;
    const data = await client.fetch(query, { priceId });
    return data?.maxOrdersPerCustomer || 10;
  };

  const handleAddToCart = async () => {
    const productInCart = cartDetails?.[price_id];
    const maxLimit = await fetchMaxLimit(price_id);

    if (productInCart?.quantity >= maxLimit) {
      setPopupMessage(`Du kan kun bestille maks ${maxLimit} av dette produktet i dag.`);
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
      maxOrdersPerCustomer: maxLimit,
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
