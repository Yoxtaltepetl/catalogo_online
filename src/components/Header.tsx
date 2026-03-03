"use client";

import { Search, ShoppingCart, Bell, Home, Pizza, Utensils, Coffee, IceCreamBowl, UtensilsCrossed, Package, Info } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRef } from "react";

const mobileNavItems = [
    { tKey: "nav.home", href: "/", icon: Home },
    { tKey: "nav.packages", href: "/categoria/paquetes", icon: Package },
    { tKey: "nav.pizzas", href: "/categoria/pizzas", icon: Pizza },
    { tKey: "nav.burgers", href: "/categoria/hamburguesas", icon: Utensils },
    { tKey: "nav.tacos", href: "/categoria/tacos", icon: UtensilsCrossed },
    { tKey: "nav.drinks", href: "/categoria/bebidas", icon: Coffee },
    { tKey: "nav.desserts", href: "/categoria/postres", icon: IceCreamBowl },
    { tKey: "nav.about", href: "/nosotros", icon: Info },
];

export default function Header() {
    const { cartCount, openCart } = useCart();
    const pathname = usePathname();
    const { t } = useLanguage();

    const scrollContainerRef = useRef<HTMLElement>(null);
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
        <>
            <header className="sticky top-0 z-40 w-full bg-background/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border py-4 px-6 md:px-10 flex items-center justify-between">
                {/* Search Bar */}
                <div className="flex-1 max-w-xl">
                    <div className="relative flex items-center w-full h-12 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-slate-400 pl-2">
                            <Search className="h-5 w-5" />
                        </div>
                        <input
                            className="peer h-full w-full outline-none text-sm text-slate-700 dark:text-slate-200 bg-transparent pr-4"
                            type="text"
                            id="search"
                            placeholder="Buscar en el menú..."
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 lg:gap-6 ml-4">
                    <LanguageSwitcher />
                    {/* Cart */}
                    <button onClick={openCart} className="relative p-2 text-slate-600 hover:text-foreground dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                        <ShoppingCart className="h-6 w-6" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm transform translate-x-1/4 -translate-y-1/4">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 text-slate-600 hover:text-foreground dark:text-slate-400 dark:hover:text-slate-200 transition-colors hidden md:block">
                        <Bell className="h-6 w-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Category Navigation (Horizontal List) */}
            <div className="lg:hidden bg-background border-b border-border sticky top-[73px] z-30 px-4 py-3">
                <nav
                    ref={scrollContainerRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1 cursor-grab active:cursor-grabbing"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {mobileNavItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.tKey}
                                href={item.href}
                                draggable={false}
                                onDragStart={(e) => e.preventDefault()}
                                onClick={(e) => {
                                    if (hasDragged.current) e.preventDefault();
                                }}
                                className={`flex whitespace-nowrap items-center gap-2 px-4 py-2 rounded-full transition-colors text-sm font-semibold border select-none
                            ${isActive
                                        ? "bg-primary text-white border-primary shadow-sm shadow-primary/20"
                                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                                    }
                            `}
                            >
                                <Icon className="w-4 h-4 pointer-events-none" />
                                <span className="pointer-events-none">{t(item.tKey)}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}
