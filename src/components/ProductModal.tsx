"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product, ProductCustomization } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useLanguage } from "@/context/LanguageContext";

interface ProductModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const { addToCart } = useCart();
    const { addToast } = useToast();
    const { language, t } = useLanguage();

    const [selectedExtras, setSelectedExtras] = useState<ProductCustomization[]>([]);
    const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
    const [notes, setNotes] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(language === 'en' ? (product.priceUSD || product.price) : product.price);

    // Reset form when product changes
    useEffect(() => {
        setSelectedExtras([]);
        setRemovedIngredients([]);
        setNotes("");
        setQuantity(1);
        setTotalPrice(language === 'en' ? (product.priceUSD || product.price) : product.price);
    }, [product, language]);

    // Recalculate price when extras or quantity changes
    useEffect(() => {
        const basePrice = language === 'en' ? (product.priceUSD || product.price) : product.price;
        const extrasTotal = selectedExtras.reduce((sum, extra) => {
            const extraPrice = language === 'en' ? (extra.priceUSD || extra.price || 0) : (extra.price || 0);
            return sum + extraPrice;
        }, 0);
        setTotalPrice((basePrice + extrasTotal) * quantity);
    }, [selectedExtras, quantity, product.price, product.priceUSD, language]);

    if (!isOpen) return null;

    const toggleExtra = (extra: ProductCustomization) => {
        setSelectedExtras(prev => {
            const getExName = (n: string | import('@/data/menu').LocalizedString) => typeof n === 'string' ? n : n[language];
            const targetName = getExName(extra.name);
            return prev.some(e => getExName(e.name) === targetName)
                ? prev.filter(e => getExName(e.name) !== targetName)
                : [...prev, extra];
        });
    };

    const toggleRemovable = (ingredient: string) => {
        setRemovedIngredients(prev =>
            prev.includes(ingredient)
                ? prev.filter(i => i !== ingredient)
                : [...prev, ingredient]
        );
    };

    const handleAddToCart = () => {
        addToCart({
            product,
            quantity,
            selectedExtras,
            removedIngredients,
            notes
        });
        const msg = language === 'es' ? `"${product.name.es}" agregado al carrito` : `"${product.name.en}" added to cart`;
        addToast(msg, "success");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-fade-in-up max-h-[90vh] flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div className="relative h-64 w-full shrink-0">
                    <Image
                        src={product.image}
                        alt={product.name[language]}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <h2 className="text-2xl font-bold mb-2">{product.name[language]}</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">{product.description[language]}</p>

                    {/* Extras Section */}
                    {product.extras && product.extras.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3 border-b pb-2">{t('modal.extras')}</h3>
                            <div className="space-y-2">
                                {product.extras.map(extra => {
                                    const exName = typeof extra.name === 'string' ? extra.name : extra.name[language];
                                    return (
                                        <label key={exName} className="flex items-center justify-between cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary accent-primary"
                                                        checked={selectedExtras.some(e => {
                                                            const eName = typeof e.name === 'string' ? e.name : e.name[language];
                                                            return eName === exName;
                                                        })}
                                                        onChange={() => toggleExtra(extra)}
                                                    />
                                                </div>
                                                <span className="text-foreground group-hover:text-primary transition-colors">{exName}</span>
                                            </div>
                                            {extra.price && <span className="font-medium text-slate-600 dark:text-slate-300">+{new Intl.NumberFormat(language === 'es' ? 'es-MX' : 'en-US', { style: 'currency', currency: language === 'es' ? 'MXN' : 'USD' }).format(language === 'en' ? (extra.priceUSD || extra.price) : extra.price)}</span>}
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Removables Section */}
                    {product.removables && product.removables.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3 border-b pb-2">{t('modal.removables')}</h3>
                            <div className="space-y-2">
                                {product.removables.map(ingredient => (
                                    <label key={ingredient} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded border-slate-300 text-red-500 focus:ring-red-500 accent-red-500"
                                            checked={removedIngredients.includes(ingredient)}
                                            onChange={() => toggleRemovable(ingredient)}
                                        />
                                        <span className="text-foreground group-hover:text-red-500 transition-colors">{ingredient}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Special Notes */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">{language === 'es' ? 'Notas Especiales' : 'Special Notes'}</h3>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder={language === 'es' ? "Ej. Sin picante, bien cocida, aderezo aparte..." : "Ex. No spice, well done, dressing on the side..."}
                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-slate-100 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center gap-4 shrink-0">
                    <div className="flex items-center gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <span className="font-semibold w-4 text-center">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-primary hover:bg-primary-hover text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-between transition-colors shadow-lg shadow-primary/30"
                    >
                        <span>{t('product.add')}</span>
                        <span>{new Intl.NumberFormat(language === 'es' ? 'es-MX' : 'en-US', { style: 'currency', currency: language === 'es' ? 'MXN' : 'USD' }).format(totalPrice)}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
