"use client";

import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react"; // Import ShoppingCart icon
import "./NavBar.css";

export default function NavBar() {
    const { handleCartClick } = useShoppingCart();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
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
                    <Link className="navbar-link" href="/Om_oss">
                        Om oss
                    </Link>
                </nav>
                <div className="navbar-cart">
                    <button
                        onClick={handleCartClick}
                        className="navbar-cart-button"
                    >
                        <ShoppingCart className="navbar-cart-icon" />
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
                            href="/Om_oss"
                            className="overlay-link"
                            onClick={() => setMenuOpen(false)}
                        >
                            Om oss
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
