"use client";

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { client } from "@/app/lib/sanity";
import "./ShoppingCartModal.css"; // Import the CSS file

export default function ShoppingCartModal() {
    const { cartCount, shouldDisplayCart, handleCartClick, cartDetails, removeItem, totalPrice, incrementItem, decrementItem } = useShoppingCart();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState(""); // Message for popup
    const [deliveryOption, setDeliveryOption] = useState<string>("hjemme-levering"); // Default to "hjemme-levering"
    const [postalCode, setPostalCode] = useState<string>(""); // Track postal code for "hjemme levering"
    const [errorMessage, setErrorMessage] = useState<string>(""); // Track error messages

    const fetchMaxLimit = async (priceId: string) => {
        const query = `*[_type == "product" && price_id == $priceId][0]{maxOrdersPerCustomer}`;
        const data = await client.fetch(query, { priceId });
        return data?.maxOrdersPerCustomer || 10; // Default to 10 if missing
    };

    const handleIncrementItem = async (id: string, priceId: string) => {
        const product = cartDetails?.[id];
        if (!product) return;

        const maxLimit = await fetchMaxLimit(priceId); // Fetch dynamically
        if (product.quantity >= maxLimit) {
            setPopupMessage(`Du kan kun bestille maks ${maxLimit} av dette produktet i dag.`);
            setIsPopupOpen(true);
            return;
        }

        incrementItem(id);
    };

    const handleOverlayClick = () => {
        setIsPopupOpen(false);
    };

    const handleDeliveryOptionChange = (option: string) => {
        setDeliveryOption(option);
        setErrorMessage(""); // Clear any existing error messages
        if (option === "hente-i-butikk") {
            setPostalCode(""); // Clear postal code for "hente i butikk"
        }
    };

    const handleProceedToCheckout = async () => {
        if (!deliveryOption) {
            setErrorMessage("Vennligst velg en leveringsmetode før du fortsetter.");
            return;
        }

        if (deliveryOption === "hjemme-levering" && !postalCode) {
            setErrorMessage("Vennligst skriv inn postnummer for hjemme levering.");
            return;
        }

        try {
            const items = Object.values(cartDetails ?? {}).map((entry) => ({
                priceId: entry.price_id,
                quantity: entry.quantity,
            }));

            const response = await fetch("http://localhost:5001/create-onetime-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, deliveryOption, postalCode }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error) {
                    setErrorMessage(errorData.error); // Set the error message from the backend
                }
                return;
            }

            const { url } = await response.json();
            if (url) {
                window.location.href = url;
            } else {
                console.error("Failed to create Stripe session");
            }
        } catch (error) {
            console.error("Error creating checkout session", error);
            setErrorMessage("En feil oppstod. Prøv igjen senere.");
        }
    };
    

    return (
        <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
            <SheetContent className="shopping-cart-modal">
                <SheetHeader>
                    <SheetTitle>Handlevogn</SheetTitle>
                </SheetHeader>

                <div className="shopping-cart-content">
                    <div className="cart-items-container">
                        <ul className="cart-item-list">
                            {cartCount === 0 ? (
                                <h1 className="empty-cart-message">Du har ingen varer i handlekurven</h1>
                            ) : (
                                Object.values(cartDetails ?? {}).map((entry) => (
                                    <li key={entry.id} className="cart-item">
                                        <div className="cart-item-image-container">
                                            <Image
                                                src={entry.image as string}
                                                alt="product image"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>

                                        <div className="cart-item-details">
                                            <div>
                                                <div className="cart-item-header">
                                                    <h3>{entry.name}</h3>
                                                    <p className="cart-item-price">Kr {entry.price}</p>
                                                </div>
                                                <p className="cart-item-description">{entry.description}</p>
                                            </div>

                                            <div className="cart-item-footer">
                                                <p className="cart-item-quantity">Antall: {entry.quantity}</p>

                                                <div className="cart-item-actions">
                                                    <button type="button" onClick={() => decrementItem(entry.id)} className="cart-action-button remove-item">
                                                        -
                                                    </button>

                                                    <button type="button" onClick={() => removeItem(entry.id)} className="cart-action-button remove-all">
                                                        Fjern alle
                                                    </button>

                                                    <button type="button" onClick={() => handleIncrementItem(entry.id, entry.price_id)} className="cart-action-button add-item">
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>

                {isPopupOpen && (
                    <div className="popup-overlay" onClick={handleOverlayClick}>
                        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                            <h3 className="popup-header">Begrensning</h3>
                            <p className="popup-message">{popupMessage}</p>
                            <button className="close-popup" onClick={handleOverlayClick}>OK</button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}