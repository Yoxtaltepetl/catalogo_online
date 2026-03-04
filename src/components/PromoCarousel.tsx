"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { products, Product } from "@/data/menu";
import ProductModal from "./ProductModal";
import { useLanguage } from "@/context/LanguageContext";

export default function PromoCarousel() {
    const { language, t } = useLanguage();
    const promos = products.filter(p => p.isPromo);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Auto-advance carousel
    useEffect(() => {
        if (promos.length <= 1) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % promos.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [promos.length]);

    if (promos.length === 0) return null;

    const currentPromo = promos[currentIndex];

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % promos.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + promos.length) % promos.length);

    return (
        <section className="relative w-full max-w-7xl mx-auto mt-6 rounded-3xl h-[45vh] min-h-[420px] md:min-h-[380px] bg-slate-900 overflow-hidden group shadow-2xl">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
                <Image
                    key={currentPromo.id}
                    src={currentPromo.image}
                    alt={currentPromo.name[language]}
                    fill
                    className="object-cover opacity-60 animate-fade-in"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 md:to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-6 md:px-12 flex flex-col justify-center pb-12 md:pb-0">
                <div className="max-w-xl animate-slide-in-right">
                    <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 shadow-lg shadow-primary/40">
                        {t('promo.title')}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-md">
                        {currentPromo.name[language]}
                    </h2>
                    <p className="text-base md:text-lg text-slate-200 mb-6 drop-shadow line-clamp-3 md:line-clamp-none">
                        {currentPromo.description[language]}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 md:gap-6">
                        <span className="text-3xl font-extrabold text-amber-400 drop-shadow-md">
                            ${currentPromo.price.toFixed(2)}
                        </span>
                        <button
                            onClick={() => setSelectedProduct(currentPromo)}
                            className="px-6 md:px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
                        >
                            {language === 'es' ? '¡Lo Quiero!' : 'I Want It!'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            {promos.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-primary text-white rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all z-20"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-primary text-white rounded-full flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all z-20"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {promos.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* Modal integration for quick add */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </section>
    );
}
