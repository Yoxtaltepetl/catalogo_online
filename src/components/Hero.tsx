"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <Image
                    src="/images/products/hamburguesa/hamburguesa-bbq.webp"
                    alt="Restaurante Interior"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="relative z-20 text-center px-4 max-w-3xl animate-fade-in-up">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary-foreground border border-primary/50 text-sm font-medium mb-4 backdrop-blur-sm">
                    {t('footer.brand')}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    {t('hero.title')}
                </h1>
                <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto text-balance">
                    {t('hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#menu" className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg shadow-primary/30">
                        {t('hero.cta')}
                    </a>
                </div>
            </div>
        </section>
    );
}
