"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import React, { useState, useEffect } from "react";
import "./NavBar.css";

const links = [
    { name: 'Hjem', href: '/' },
    { name: 'Nyheter', href: '/Nyheter' },
    { name: 'Om oss', href: '/Om_oss' },
    { name: 'Kontakt oss', href: '/kontakt_oss' }


];

export default function NavBar() {
    const pathname = usePathname();
    const { handleCartClick } = useShoppingCart();
    const [menuOpen, setMenuOpen] = useState(false);

    // Disable scrolling when the menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'auto'; // Enable scrolling
        }

        // Cleanup to reset overflow when component unmounts or menu is closed
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen]);

    return (
       <header className="navbar">
            <div className="navbar-container">
                {/* Hamburger icon for mobile view */}
                <button 
                    className="navbar-hamburger" 
                    onClick={() => setMenuOpen(true)}
                >
                    ☰
                </button>
                
                {/* Desktop navigation links */}
                <nav className="navbar-links">
                    {links.map((link, idx) => (
                        <div key={idx}>
                            {pathname === link.href ? (
                                <Link className="navbar-link-active" href={link.href}>
                                    {link.name}
                                </Link>
                            ) : (
                                <Link className="navbar-link" href={link.href}>
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                <div className="navbar-cart">
                    <Button 
                        variant={"outline"} 
                        onClick={handleCartClick}    
                        className="navbar-cart-button"
                    >
                        <ShoppingBag />
                        <span className="navbar-cart-text">Cart</span>
                    </Button>
                </div>
            </div>

            {/* Overlay menu for mobile view */}
            {menuOpen && (
                <div className="overlay-menu">
                    <button className="overlay-close" onClick={() => setMenuOpen(false)}>
                        ×
                    </button>
                    <nav className="overlay-links">
                        {links.map((link, idx) => (
                            <Link 
                                key={idx} 
                                href={link.href} 
                                className="overlay-link" 
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
       </header>
    );
}
