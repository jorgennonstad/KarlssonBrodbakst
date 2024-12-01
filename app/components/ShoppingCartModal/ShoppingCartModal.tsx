"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useShoppingCart } from "use-shopping-cart"
import Image from 'next/image'
import { Button } from '@/components/ui/button';

export default function ShoppingCartModal() {
    const { cartCount, shouldDisplayCart, handleCartClick, cartDetails, removeItem, totalPrice } = useShoppingCart();

    async function handleCheckoutClick(event: any) {
        event.preventDefault();
        
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
      
      
    

    return (
        <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
            <SheetContent className="sm:max-w-lg w-[90vw]">
                <SheetHeader>
                    <SheetTitle>Handlevogn</SheetTitle>
                </SheetHeader>

                <div className="h-full flex flex-col justify-between z-100">
                    <div className="mt-8 flex-1 overflow-y-auto">
                        <ul className="-my-6 divide-y divide-gray-200">
                            {cartCount === 0 ? (
                                <h1 className="py-6">Du har ingen varer i handlekurven</h1>
                            ) : (
                                <>
                                    {Object.values(cartDetails ?? {}).map((entry) => {
                                        return (
                                            <li key={entry.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                                                    <Image 
                                                        src={entry.image as string} 
                                                        alt="product image" 
                                                        layout="fill"  
                                                        objectFit="cover" 
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>{entry.name}</h3>
                                                            <p className="ml-4">Kr {entry.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500 w-[90%] line-clamp-2">
                                                            {entry.description}
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500">Antall: {entry.quantity}</p>

                                                        <div className="flex">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeItem(entry.id)}
                                                                className="font-medium text-primary hover:text-primary/80"
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

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Tottal:</p>
                            <p>{totalPrice} Kr</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                            Frakt velges og legges til ved checkout
                        </p>
                        <div className="m t-6">
                            <Button onClick={handleCheckoutClick} className="w-full">
                                Gå til kassen
                            </Button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                ELLER {""} 
                                <button onClick={() => handleCartClick()} className="font-md text-primary hover:text-primary/80">Fortsett å handle</button>
                            </p>
                        </div>
                    </div>
                </div>
            </SheetContent> 
        </Sheet>
    );
}
