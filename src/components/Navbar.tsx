"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { cartCount, openCart } = useCart();

    return (
        <header className="sticky top-0 z-40 w-full glass border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400">
                        Sabor Premium
                    </span>
                </Link>

                <nav className="flex items-center gap-4">
                    <button onClick={openCart} className="relative group">
                        <div className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full animate-fade-in shadow-md">
                                {cartCount}
                            </span>
                        )}
                        <span className="sr-only">Carrito</span>
                    </button>
                </nav>
            </div>
        </header>
    );
}
