"use client"

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

    const [isPopupOpen, setIsPopupOpen] = useState(false); // Track the popup state

    async function handleCheckoutClick(event: any) {
        event.preventDefault();
        
        // Show the delivery popup first
        setIsPopupOpen(true);
    }

    // Handle when the user acknowledges the postal codes and proceeds to checkout
    const handleProceedToCheckout = async () => {
        setIsPopupOpen(false);

        // Prepare the cart items for checkout
        const items = Object.values(cartDetails ?? {}).map((entry) => ({
            priceId: entry.price_id,  // Correctly using price_id here
            quantity: entry.quantity,  // Quantity of the item
        }));
        console.log(items);
        
        // Send the cart items to the backend to create a Stripe checkout session
        try {
            const response = await fetch('http://localhost:5001/create-onetime-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }), // Send the priceId and quantity to the backend
            });
        
            const { url } = await response.json();
        
            // Redirect to Stripe Checkout
            if (url) {
                window.location.href = url;
            } else {
                console.error("Failed to create Stripe session");
            }
        } catch (error) {
            console.log("Error creating checkout session", error);
        }
    }

    // Modify the handleCartClick function to close the popup when the cart is toggled
    const handleCloseCart = () => {
        handleCartClick();  // Toggle the cart visibility
        setIsPopupOpen(false);  // Close the popup when cart is closed
    };

    return (
        <Sheet open={shouldDisplayCart} onOpenChange={handleCloseCart}>
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
                                    {Object.values(cartDetails ?? {}).map((entry) => {
                                        return (
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
                                        );
                                    })}
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
                            <Button onClick={handleCheckoutClick} className="checkout-button">
                                Gå til kassen
                            </Button>
                        </div>
                        <div className="continue-shopping-container">
                            <p>
                                ELLER {""} 
                                <button onClick={handleCloseCart} className="continue-shopping-button">Fortsett å handle</button>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Render the DeliveryPopup content when isPopupOpen is true */}
                {isPopupOpen && (
                    <div className="delivery-popup">
                        <div className="delivery-popup-content">
                            <h3 className="delivery-popup-header">Vi leverer kunn til postnummer <br/> xxx-xxx</h3>

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
