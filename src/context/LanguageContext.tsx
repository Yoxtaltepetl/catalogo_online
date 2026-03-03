'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    es: {
        "nav.home": "Inicio",
        "nav.packages": "Paquetes",
        "nav.pizzas": "Pizzas",
        "nav.burgers": "Hamburguesas",
        "nav.tacos": "Tacos",
        "nav.drinks": "Bebidas",
        "nav.desserts": "Postres",
        "nav.menu": "Menú",
        "nav.about": "Nosotros",
        "hero.title": "El Sabor Auténtico en Cada Mordida",
        "hero.subtitle": "Ingredientes frescos, recetas originales y pasión por la buena comida. Descubre por qué somos los favoritos de la ciudad.",
        "hero.cta": "Ver Menú Completo",
        "promo.title": "Ofertas Exclusivas",
        "featured.title": "Los Más Populares",
        "categories.all": "Todo",
        "product.add": "Agregar",
        "product.added": "Agregado",
        "modal.add": "Agregar al Carrito",
        "modal.extras": "Extras",
        "modal.removables": "Sin ingredientes",
        "about.title": "Sobre Nuestro Restaurante",
        "about.desc1": "Somos un restaurante apasionado por ofrecer el mejor sabor en cada platillo. Desde nuestra apertura, nos hemos dedicado a crear una experiencia culinaria única, desde nuestras deliciosas hamburguesas y pizzas artesanales, hasta nuestros tradicionales tacos.",
        "about.desc2": "Ven a visitarnos y disfruta de un ambiente acogedor, ideal para compartir con familia y amigos. Preparado siempre con ingredientes frescos y la mejor calidad.",
        "about.visit": "Visítanos",
        "footer.brand": "Sabor Premium",
        "footer.desc": "La mejor experiencia culinaria directa a tu puerta o lista para recoger en nuestra sucursal.",
        "footer.hours.title": "Horarios",
        "footer.hours.mf": "Lunes a Viernes: 12:00 PM - 10:00 PM",
        "footer.hours.we": "Sábados y Domingos: 1:00 PM - 11:00 PM",
        "footer.info.title": "Información",
        "footer.info.terms": "Términos de servicio",
        "footer.info.payment": "Formas de pago aceptadas",
        "footer.rights": "Todos los derechos reservados.",
    },
    en: {
        "nav.home": "Home",
        "nav.packages": "Combos",
        "nav.pizzas": "Pizzas",
        "nav.burgers": "Burgers",
        "nav.tacos": "Tacos",
        "nav.drinks": "Drinks",
        "nav.desserts": "Desserts",
        "nav.menu": "Menu",
        "nav.about": "About Us",
        "hero.title": "Authentic Taste in Every Bite",
        "hero.subtitle": "Fresh ingredients, original recipes, and a passion for great food. Discover why we are the city's favorite.",
        "hero.cta": "View Full Menu",
        "promo.title": "Exclusive Offers",
        "featured.title": "Most Popular",
        "categories.all": "All",
        "product.add": "Add",
        "product.added": "Added",
        "modal.add": "Add to Cart",
        "modal.extras": "Extras",
        "modal.removables": "Remove ingredients",
        "about.title": "About Our Restaurant",
        "about.desc1": "We are a restaurant passionate about offering the best flavor in every dish. Since our opening, we have been dedicated to creating a unique culinary experience, from our delicious burgers and artisanal pizzas to our traditional tacos.",
        "about.desc2": "Come visit us and enjoy a cozy atmosphere, ideal for sharing with family and friends. Always prepared with fresh ingredients and the highest quality.",
        "about.visit": "Visit Us",
        "footer.brand": "Premium Taste",
        "footer.desc": "The best culinary experience straight to your door or ready for pickup.",
        "footer.hours.title": "Hours",
        "footer.hours.mf": "Monday to Friday: 12:00 PM - 10:00 PM",
        "footer.hours.we": "Weekends: 1:00 PM - 11:00 PM",
        "footer.info.title": "Information",
        "footer.info.terms": "Terms of Service",
        "footer.info.payment": "Accepted payment methods",
        "footer.rights": "All rights reserved.",
    }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('es');

    useEffect(() => {
        const saved = localStorage.getItem('app_language') as Language;
        if (saved === 'es' || saved === 'en') {
            setLanguageState(saved);
            document.documentElement.lang = saved;
        } else {
            document.documentElement.lang = 'es';
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app_language', lang);
        document.documentElement.lang = lang;
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
