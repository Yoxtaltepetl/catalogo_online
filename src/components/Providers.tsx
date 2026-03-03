"use client";

import React, { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider, useToast } from "@/context/ToastContext";
import { LanguageProvider } from "@/context/LanguageContext";
import CartDrawerWrapper from "./CartDrawerWrapper";

// Simple Toast Container Component
function ToastContainer() {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-slide-in-right glass ${toast.type === "success"
                        ? "border-green-500/30 text-green-900 dark:text-green-100"
                        : toast.type === "error"
                            ? "border-red-500/30 text-red-900 dark:text-red-100"
                            : "border-primary/30"
                        }`}
                    onClick={() => removeToast(toast.id)}
                >
                    {toast.type === "success" && <span className="text-green-500 text-xl">✅</span>}
                    {toast.type === "error" && <span className="text-red-500 text-xl">❌</span>}
                    {toast.type === "info" && <span className="text-primary text-xl">ℹ️</span>}
                    <p className="font-medium text-sm">{toast.message}</p>
                </div>
            ))}
        </div>
    );
}

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <LanguageProvider>
            <ToastProvider>
                <CartProvider>
                    {children}
                    <ToastContainer />
                    <CartDrawerWrapper />
                </CartProvider>
            </ToastProvider>
        </LanguageProvider>
    );
}
