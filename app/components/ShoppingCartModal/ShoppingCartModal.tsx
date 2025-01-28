"use client";

import { useState } from 'react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useShoppingCart } from "use-shopping-cart"
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import './ShoppingCartModal.css'; // Import the CSS file

export default function ShoppingCartModal() {
    const { cartCount, shouldDisplayCart, handleCartClick, cartDetails, removeItem, totalPrice } = useShoppingCart();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [deliveryOption, setDeliveryOption] = useState<string>(''); // Track selected delivery option
    const [postalCode, setPostalCode] = useState<string>(''); // Track postal code for "hjemme levering"
    const [errorMessage, setErrorMessage] = useState<string>(''); // Track error messages

    const handleDeliveryOptionChange = (option: string) => {
        setDeliveryOption(option);
        setErrorMessage('');
        if (option === 'hente-i-butikk') {
            setPostalCode(''); // Clear postal code for "hente i butikk"
        }
    };

    const handleProceedToCheckout = async () => {
        if (deliveryOption === 'hjemme-levering' && !postalCode) {
            setErrorMessage('Vennligst skriv inn postnummer for hjemmelevering.');
            return;
        }

        try {
            const items = Object.values(cartDetails ?? {}).map((entry) => ({
                priceId: entry.price_id,
                quantity: entry.quantity,
            }));

            const response = await fetch('http://localhost:5001/create-onetime-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items,
                    deliveryOption,
                    postalCode,
                }),
            });

            const { url } = await response.json();
            if (url) {
                window.location.href = url;
            } else {
                console.error("Failed to create Stripe session");
            }
        } catch (error) {
            console.error("Error creating checkout session", error);
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
                                <>
                                    {Object.values(cartDetails ?? {}).map((entry) => (
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

                                                    <div className="remove-item-container">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(entry.id)}
                                                            className="remove-item-button"
                                                        >
                                                            Fjern
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="checkout-container">
                        <div className="checkout-summary">
                            <p>Tottal:</p>
                            <p>{totalPrice} Kr</p>
                        </div>
                        <p className="shipping-note">
                            Frakt velges og legges til ved checkout
                        </p>
                        <div className="checkout-button-container">
                            <Button onClick={() => setIsPopupOpen(true)} className="checkout-button">
                                Gå til kassen
                            </Button>
                        </div>
                    </div>
                </div>

                {isPopupOpen && (
                    <div className="delivery-popup">
                        <div className="delivery-popup-content">
                            <h3 className="delivery-popup-header">Vi leverer kun til postnummer xxxx - xxxx</h3>

                            <div className="delivery-options">
                                <label>
                                    <input
                                        type="checkbox"
                                        value="hjemme-levering"
                                        checked={deliveryOption === 'hjemme-levering'}
                                        onChange={() => handleDeliveryOptionChange('hjemme-levering')}
                                    />
                                    Hjemme levering
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="hente-i-butikk"
                                        checked={deliveryOption === 'hente-i-butikk'}
                                        onChange={() => handleDeliveryOptionChange('hente-i-butikk')}
                                    />
                                    Hente i butikk
                                </label>
                            </div>

                            {deliveryOption === 'hjemme-levering' && (
                                <div className="postal-code-input">
                                    <label>
                                        Postnummer:
                                        <input
                                            type="text"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                        />
                                    </label>
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                </div>
                            )}

                            <button
                                onClick={handleProceedToCheckout}
                                className="delivery-popup-button"
                            >
                                Fortsett til kassen
                            </button>

                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="delivery-popup-cancel"
                            >
                                Avbryt
                            </button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
