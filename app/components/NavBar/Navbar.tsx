"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import "./NavBar.css";

export default function NavBar() {
    const { handleCartClick } = useShoppingCart();
    const [menuOpen, setMenuOpen] = useState(false);

    // Disable scrolling when the menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden"; // Disable scrolling
        } else {
            document.body.style.overflow = "auto"; // Enable scrolling
        }

        // Cleanup to reset overflow when component unmounts or menu is closed
        return () => {
            document.body.style.overflow = "auto";
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
                    <Link className="navbar-link" href="/">
                        Hjem
                    </Link>

                    <Link className="navbar-link" href="/Om_oss">
                        Om oss
                    </Link>
                </nav>

                <div className="navbar-cart">
                    <Button
                        variant="outline"
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
