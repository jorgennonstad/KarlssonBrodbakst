"use client";

import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import "./NavBar.css";

export default function NavBar() {
    const { handleCartClick, cartCount } = useShoppingCart(); // Add cartCount to access the current item count
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        console.log("6")
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen]);

    return (
        <header className="navbar">
            <div className="navbar-container">
                <button
                    className="navbar-hamburger"
                    onClick={() => setMenuOpen(true)}
                >
                    ☰
                </button>
                <nav className="navbar-links">
                    <Link className="navbar-link" href="/">
                        Hjem
                    </Link>
                    <Link className="navbar-link" href="/Catering">
                        Catering
                    </Link>
                    <Link className="navbar-link" href="/Om_oss">
                        Om oss
                    </Link>
                    <Link className="navbar-link" href="/Kontakt_oss">
                        Kontakt oss
                    </Link>
                    <div className="navbar-link">
                        
                    </div>
                </nav>
                <div className="navbar-cart">
                    <button
                        onClick={() => handleCartClick()} // Remove event from here
                        className="navbar-cart-button"
                    >
                        <ShoppingCart className="navbar-cart-icon" />
                        {cartCount && (cartCount ?? 0) > 0 && ( // Show cart count only if it's greater than 0
                            <span className="navbar-cart-count">{cartCount}</span>
                        )}
                        <span className="navbar-cart-text">Handlekurv</span>
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="overlay-menu">
                    <button
                        className="overlay-close"
                        onClick={() => setMenuOpen(false)}
                    >
                        ×
                    </button>
                    <nav className="overlay-links">
                        <Link
                            href="/"
                            className="overlay-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            Hjem
                        </Link>
                        <Link
                            href="/Catering"
                            className="overlay-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            Catering
                        </Link>
                        <Link
                            href="/Om_oss"
                            className="overlay-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            Om oss
                        </Link>
                        <Link
                            href="/Kontakt_oss"
                            className="overlay-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            Kontakt oss
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
