"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutUs() {
    const { t, language } = useLanguage();

    return (
        <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800" id="nosotros">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

                    <div className="space-y-6">
                        <span className="text-secondary font-bold tracking-wider uppercase text-sm">{language === 'es' ? 'Acerca de Nosotros' : 'About Us'}</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                            {t('about.title')}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            {t('about.desc1')}
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            {t('about.desc2')}
                        </p>

                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div>
                                <h4 className="font-bold text-xl text-foreground">{t('footer.hours.title')}</h4>
                                <p className="text-slate-500 mt-2">{t('footer.hours.mf')}</p>
                                <p className="text-slate-500">{t('footer.hours.we')}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-xl text-foreground">{language === 'es' ? 'Contacto' : 'Contact'}</h4>
                                <p className="text-slate-500 mt-2">{language === 'es' ? 'Tel' : 'Phone'}: (555) 123-4567</p>
                                <p className="text-slate-500">contacto@saborpremium.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl relative border-4 border-white dark:border-slate-800">
                        {/* Generic Map Embedded iframe */}
                        <iframe
                            title={language === 'es' ? "Ubicación del Restaurante" : "Restaurant Location"}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1111!2d-99.1332!3d19.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzU3LjQiTiA5OcKwMDcnNTkuNSJX!5e0!3m2!1ses!2smx!4v1"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>

                        {/* Overlay hint */}
                        <div className="absolute top-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-foreground flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {t('about.visit')}
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">Av. Principal 123, Centro Culinario</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
