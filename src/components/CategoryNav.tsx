"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { categories } from "@/data/menu";
import { useLanguage } from "@/context/LanguageContext";

export default function CategoryNav() {
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

    return (
        <nav aria-label="Categorías del Menú">
            <h2 className="text-xl font-bold mb-4 px-2 lg:hidden">{t("nav.menu")}</h2>

            <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="flex overflow-x-auto lg:flex-col lg:overflow-visible gap-3 pb-4 lg:pb-0 scrollbar-hide cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/categoria/${category.id}`}
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        onClick={(e) => {
                            if (hasDragged.current) e.preventDefault();
                        }}
                        className="flex-shrink-0 flex items-center p-4 lg:p-3 bg-card rounded-2xl lg:rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-primary/50 transition-all group min-w-[140px] lg:min-w-0 select-none"
                    >
                        <span className="font-bold text-sm lg:text-base text-foreground group-hover:text-primary transition-colors text-center lg:text-left w-full pointer-events-none">
                            {category.name[language]}
                        </span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
