"use client";

import React, { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { categories, products, Product } from "@/data/menu";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { useLanguage } from "@/context/LanguageContext";

export default function CategoryPage() {
    const params = useParams();
    const router = useRouter();
    const categoryId = params.id as string;
    const { language, t } = useLanguage();

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const hasDragged = useRef(false);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        isDragging.current = true;
        hasDragged.current = false;
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current || !scrollContainerRef.current) return;
        e.preventDefault();
        hasDragged.current = true;
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    // Dictionary for translating tags
    const tagTranslations: Record<string, { es: string; en: string }> = {
        "Res": { es: "Res", en: "Beef" },
        "Clásicas": { es: "Clásicas", en: "Classic" },
        "Especiales": { es: "Especiales", en: "Specials" },
        "Pollo": { es: "Pollo", en: "Chicken" },
        "Picantes": { es: "Picantes", en: "Spicy" },
        "Veganas": { es: "Veganas", en: "Vegan" },
        "Saludables": { es: "Saludables", en: "Healthy" },
        "Dulce": { es: "Dulce", en: "Sweet" },
        "Gourmet": { es: "Gourmet", en: "Gourmet" },
        "Doble/Triple": { es: "Doble/Triple", en: "Double/Triple" },
        "Cerdo": { es: "Cerdo", en: "Pork" },
        "Pescado": { es: "Pescado", en: "Fish" },
        "Ligeras": { es: "Ligeras", en: "Light" },
        "Carne": { es: "Carne", en: "Meat" },
        "Vegetariana": { es: "Vegetariana", en: "Vegetarian" },
        "Mixtos": { es: "Mixtos", en: "Mixed" },
        "Especialidad": { es: "Especialidad", en: "Specialty" },
        "Mariscos": { es: "Mariscos", en: "Seafood" },
        "Fritos": { es: "Fritos", en: "Fried" },
        "Refrescos": { es: "Refrescos", en: "Sodas" },
        "Frías": { es: "Frías", en: "Cold" },
        "Aguas Frescas": { es: "Aguas Frescas", en: "Fresh Waters" },
        "Preparadas": { es: "Preparadas", en: "Prepared" },
        "Cervezas": { es: "Cervezas", en: "Beers" },
        "Alcohol": { es: "Alcohol", en: "Alcohol" },
        "Malteadas": { es: "Malteadas", en: "Milkshakes" },
        "Dulces": { es: "Dulces", en: "Sweets" },
        "Café": { es: "Café", en: "Coffee" },
        "Calientes": { es: "Calientes", en: "Hot" },
        "Tartas": { es: "Tartas", en: "Pies" },
        "Cítricos": { es: "Cítricos", en: "Citrus" },
        "Pasteles": { es: "Pasteles", en: "Cakes" },
        "Frutos Rojos": { es: "Frutos Rojos", en: "Berries" },
        "Chocolate": { es: "Chocolate", en: "Chocolate" },
        "Helados": { es: "Helados", en: "Ice Cream" },
        "Tradicionales": { es: "Tradicionales", en: "Traditional" },
        "Parejas": { es: "Parejas", en: "Couples" },
        "Hamburguesas": { es: "Hamburguesas", en: "Burgers" },
        "Familiar": { es: "Familiar", en: "Family" },
        "Pizzas": { es: "Pizzas", en: "Pizzas" },
        "Taquizas": { es: "Taquizas", en: "Taquizas" },
        "Infantil": { es: "Infantil", en: "Kids" },
        "Fiestas": { es: "Fiestas", en: "Parties" },
        "Grandes": { es: "Grandes", en: "Large" },
        "Individual": { es: "Individual", en: "Individual" },
        "Ofertas": { es: "Ofertas", en: "Offers" },
        "Botanas": { es: "Botanas", en: "Snacks" },
        "Cerdo/Pollo": { es: "Cerdo/Pollo", en: "Pork/Chicken" },
        "Tacos": { es: "Tacos", en: "Tacos" },
    };

    const getTranslatedTag = (tag: string) => {
        return tagTranslations[tag]?.[language] || tag;
    };

    const category = categories.find(c => c.id === categoryId);
    const categoryProducts = products.filter(p => p.categoryId === categoryId);

    // Extract unique tags from the products in this category
    const availableTags = Array.from(new Set(categoryProducts.flatMap(p => p.tags || []))).sort();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>("Todas");

    const filteredProducts = activeFilter === "Todas"
        ? categoryProducts
        : categoryProducts.filter(p => p.tags?.includes(activeFilter));

    if (!category) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">{language === 'es' ? 'Categoría no encontrada' : 'Category not found'}</h1>
                <button onClick={() => router.push("/")} className="text-primary hover:underline">
                    {language === 'es' ? 'Volver al inicio' : 'Back to Home'}
                </button>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-background py-8">
            <div className="container mx-auto px-6 md:px-10">
                {/* Header Title & Items info */}
                <div className="mb-6">
                    <h1 className="text-4xl font-extrabold text-slate-800 capitalize">{category.name[language]}</h1>
                    <p className="text-primary text-sm font-medium mt-1">
                        {filteredProducts.length} {language === 'es' ? 'productos encontrados' : 'products found'}
                    </p>
                </div>

                {/* Filter Pills */}
                {availableTags.length > 0 && (
                    <div
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeave}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        className="flex overflow-x-auto gap-3 pb-4 mb-4 scrollbar-hide cursor-grab active:cursor-grabbing"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        <button
                            onClick={(e) => {
                                if (hasDragged.current) e.preventDefault();
                                else setActiveFilter("Todas");
                            }}
                            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm
                                ${activeFilter === "Todas"
                                    ? "bg-primary text-primary-foreground shadow-primary/30"
                                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            {t("categories.all")}
                        </button>
                        {availableTags.map(tag => (
                            <button
                                key={tag}
                                onClick={(e) => {
                                    if (hasDragged.current) e.preventDefault();
                                    else setActiveFilter(tag);
                                }}
                                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm
                                ${activeFilter === tag
                                        ? "bg-primary text-primary-foreground shadow-primary/30"
                                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                    }`}
                            >
                                {getTranslatedTag(tag)}
                            </button>
                        ))}
                    </div>
                )}

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onActionClick={(product) => setSelectedProduct(product)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
                        <p className="text-slate-500">{language === 'es' ? 'Aún no hay productos en esta categoría.' : 'No products found in this category'}</p>
                    </div>
                )}
            </div>

            {/* Modal Integration */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}
