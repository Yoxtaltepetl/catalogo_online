"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, ProductCustomization } from '@/data/menu';
import { useLanguage } from '@/context/LanguageContext';

export interface CartItem {
    id: string; // Unique ID for this cart entry (since same product can have different configs)
    product: Product;
    quantity: number;
    selectedExtras: ProductCustomization[];
    removedIngredients: string[];
    notes: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: Omit<CartItem, 'id'>) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    cartCount: number;
    cartTotal: number;
    clearCart: () => void;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        setIsMounted(true);
        const savedCart = localStorage.getItem('restaurant-cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem('restaurant-cart', JSON.stringify(cart));
        }
    }, [cart, isMounted]);

    const addToCart = (item: Omit<CartItem, 'id'>) => {
        setCart((prev) => {
            // Create a unique ID for this cart item based on current time and random string
            const newItem: CartItem = {
                ...item,
                id: `${item.product.id}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            };
            return [...prev, newItem];
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity < 1) return;
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const { language } = useLanguage();

    const cartTotal = cart.reduce((total, item) => {
        const basePrice = language === 'en' ? (item.product.priceUSD || item.product.price) : item.product.price;
        const extrasPrice = item.selectedExtras.reduce((sum, extra) => {
            const extraPrice = language === 'en' ? (extra.priceUSD || extra.price || 0) : (extra.price || 0);
            return sum + extraPrice;
        }, 0);
        const itemTotal = (basePrice + extrasPrice) * item.quantity;
        return total + itemTotal;
    }, 0);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal, clearCart, isCartOpen, openCart, closeCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
