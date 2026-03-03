"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/data/menu";
import { Star, Plus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCardProps {
    product: Product;
    onActionClick: (product: Product) => void;
}

export default function ProductCard({ product, onActionClick }: ProductCardProps) {
    const { language, t } = useLanguage();

    // Fake rating for demo purposes to match design (deterministic to avoid hydration mismatch)
    const rating = product.rating || (4.0 + (product.name[language]?.length % 10) / 10).toFixed(1);

    // Format price
    const currentPrice = language === 'en' ? (product.priceUSD || product.price) : product.price;
    const priceFormatted = new Intl.NumberFormat(language === 'es' ? 'es-MX' : 'en-US', {
        style: 'currency',
        currency: language === 'es' ? 'MXN' : 'USD'
    }).format(currentPrice);

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
            <div className="relative h-56 w-full overflow-hidden p-2">
                <div className="relative h-full w-full rounded-2xl overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name[language]}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm text-slate-700 dark:text-slate-200 flex items-center gap-1 z-10 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {rating}
                    </div>
                    {product.isPromo && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            Promo
                        </div>
                    )}
                </div>
            </div>

            <div className="px-5 pb-5 pt-3 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-foreground leading-tight pr-2">{product.name[language]}</h3>
                    <span className="font-bold text-lg text-primary">{priceFormatted}</span>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 flex-1 line-clamp-2">
                    {product.description[language]}
                </p>

                <button
                    onClick={() => onActionClick(product)}
                    className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary py-3 rounded-2xl font-semibold transition-colors mt-auto"
                    aria-label={t('product.add')}
                >
                    <Plus className="w-4 h-4" />
                    {t('product.add')}
                </button>
            </div>
        </div>
    );
}
