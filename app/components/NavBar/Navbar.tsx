"use client";

import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import "./NavBar.css";
import { IoMenuSharp } from "react-icons/io5";

export default function NavBar() {
    const { handleCartClick, cartCount, shouldDisplayCart } = useShoppingCart(); // ✅ Added shouldDisplayCart
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (menuOpen || shouldDisplayCart) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [menuOpen, shouldDisplayCart]);

    return (
        <header className="navbar">
            <div className="navbar-container">
                <button className="navbar-hamburger" onClick={() => setMenuOpen(true)}>
                    <IoMenuSharp />
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
                    <div></div>
                </nav>

                {/* ✅ Hide the cart button when the cart menu is open */}
                {!shouldDisplayCart && (
                    <div className="navbar-cart">
                        <button onClick={handleCartClick} className="navbar-cart-button">
                            <ShoppingCart className="navbar-cart-icon" />
                            {(cartCount ?? 0) > 0 && (
                                <span className="navbar-cart-count">{cartCount}</span>
                            )}
                            <span className="navbar-cart-text">Handlekurv</span>
                        </button>
                    </div>
                )}
            </div>

            {/* ✅ Mobile Menu Overlay */}
            {menuOpen && (
                <div className="overlay-menu">
                    <button className="overlay-close" onClick={() => setMenuOpen(false)}>
                        ×
                    </button>
                    <nav className="overlay-links">
                        <Link href="/" className="overlay-link" onClick={() => setMenuOpen(false)}>
                            Hjem
                        </Link>
                        <Link href="/Catering" className="overlay-link" onClick={() => setMenuOpen(false)}>
                            Catering
                        </Link>
                        <Link href="/Om_oss" className="overlay-link" onClick={() => setMenuOpen(false)}>
                            Om oss
                        </Link>
                        <Link href="/Kontakt_oss" className="overlay-link" onClick={() => setMenuOpen(false)}>
                            Kontakt oss
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
