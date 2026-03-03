"use client";

import React, { useState } from "react";
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
                    <div className="flex flex-wrap gap-3 mb-8">
                        <button
                            onClick={() => setActiveFilter("Todas")}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm
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
                                onClick={() => setActiveFilter(tag)}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm
                                ${activeFilter === tag
                                        ? "bg-primary text-primary-foreground shadow-primary/30"
                                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                    }`}
                            >
                                {tag}
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
