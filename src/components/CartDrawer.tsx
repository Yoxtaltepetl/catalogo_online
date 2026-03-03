"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { language } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold">{language === 'es' ? 'Tu Pedido' : 'Your Order'}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col">
                    {cart.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-500">
                            <svg className="w-16 h-16 mb-4 text-slate-300 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="text-lg font-medium text-foreground">{language === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty'}</p>
                            <p className="text-sm">{language === 'es' ? 'Agrega algunos platillos deliciosos.' : 'Add some delicious dishes.'}</p>
                            <button
                                onClick={onClose}
                                className="mt-6 px-6 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-full font-medium transition-colors"
                            >
                                {language === 'es' ? 'Ver Menú' : 'View Menu'}
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Items List */}
                            <div className="space-y-4">
                                {cart.map((item) => {
                                    const extrasTotal = item.selectedExtras.reduce((s, e) => s + (e.price || 0), 0);
                                    const itemPrice = (item.product.price + extrasTotal) * item.quantity;

                                    return (
                                        <div key={item.id} className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl relative group transition-colors">
                                            {/* Image */}
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                                <Image src={item.product.image} alt={item.product.name[language]} fill className="object-cover" />
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-foreground text-sm line-clamp-1">{item.product.name[language]}</h3>

                                                    {/* Modifiers List */}
                                                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 space-y-0.5">
                                                        {item.selectedExtras.map(e => {
                                                            const exName = typeof e.name === 'string' ? e.name : e.name[language];
                                                            return <p key={exName} className="text-green-600 dark:text-green-500">+ {exName}</p>;
                                                        })}
                                                        {item.removedIngredients.map(i => (
                                                            <p key={i} className="text-red-500 line-through">{i}</p>
                                                        ))}
                                                        {item.notes && <p className="italic bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-[10px] inline-block mt-1">&quot;{item.notes}&quot;</p>}
                                                    </div>
                                                </div>

                                                {/* Controls & Price */}
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                                                        >-</button>
                                                        <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                                                        >+</button>
                                                    </div>
                                                    <span className="font-semibold text-primary">${itemPrice.toFixed(2)}</span>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="absolute -top-2 -right-2 bg-red-50 text-red-500 p-1.5 rounded-full shadow-sm hover:bg-red-500 hover:text-white transition-colors border border-red-100 dark:border-red-900 dark:bg-slate-800"
                                                title={language === 'es' ? 'Eliminar producto' : 'Remove product'}
                                            >
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <button
                                onClick={clearCart}
                                className="text-xs text-slate-400 hover:text-red-500 text-center w-full transition-colors underline"
                            >
                                {language === 'es' ? 'Vaciar carrito completo' : 'Empty Cart'}
                            </button>
                        </>
                    )}
                </div>

                {/* Footer Area */}
                {cart.length > 0 && (
                    <div className="border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50 mt-auto">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-slate-500 font-medium">Subtotal</span>
                            <span className="text-xl font-bold text-foreground">{new Intl.NumberFormat(language === 'es' ? 'es-MX' : 'en-US', { style: 'currency', currency: language === 'es' ? 'MXN' : 'USD' }).format(cartTotal)}</span>
                        </div>

                        <Link
                            href="/checkout"
                            onClick={onClose}
                            className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/30"
                        >
                            <span>{language === 'es' ? 'Ir Pagar mi Pedido' : 'Go to Checkout'}</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
