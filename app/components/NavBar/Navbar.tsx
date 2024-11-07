"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import "./NavBar.css";

const links = [
    { name: 'Våre varer', href: '#products-scroll' },
    {name: 'Abonnemang', href: '/Abonnement'},
    {name: 'Nyheter', href: '/Nyheter'},
    {name: 'Om oss', href: '/Om oss'},
];

export default function NavBar() {
    const pathname = usePathname();
    const { handleCartClick } = useShoppingCart();
    return (
       <header className="navbar">
            <div className="navbar-container">
                <Link href="/">
                    <h1 className="navbar-logo">
                        Next<span className="navbar-logo-highlight">Commerce</span>
                    </h1>
                </Link>

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
       </header>
    );
};
