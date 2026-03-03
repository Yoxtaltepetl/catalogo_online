"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

// A small wrapper to fetch context values properly since we need to inject them as props 
// or read them directly in CartDrawer without modifying its props signature if we wanted to
export default function CartDrawerWrapper() {
    const { isCartOpen, closeCart } = useCart();
    return <CartDrawer isOpen={isCartOpen} onClose={closeCart} />;
}
