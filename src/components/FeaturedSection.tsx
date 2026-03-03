"use client";

import React, { useState } from "react";
import { products, Product } from "@/data/menu";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function FeaturedSection() {
    // Get 12 products that are marked as popular or promo, to show a diverse 'best sellers' list
    const featured = products.filter(p => p.isPopular || p.isPromo).slice(0, 12);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleProductAction = (product: Product) => {
        setSelectedProduct(product);
    };

    return (
        <section>
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
                    {featured.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onActionClick={handleProductAction}
                        />
                    ))}
                </div>
            </div>

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
