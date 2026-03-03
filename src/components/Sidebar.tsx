"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Pizza, Coffee, IceCreamBowl, Info, Utensils, UtensilsCrossed, Package } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const navItems = [
    { tKey: "nav.home", href: "/", icon: Home },
    { tKey: "nav.packages", href: "/categoria/paquetes", icon: Package },
    { tKey: "nav.pizzas", href: "/categoria/pizzas", icon: Pizza },
    { tKey: "nav.burgers", href: "/categoria/hamburguesas", icon: Utensils },
    { tKey: "nav.tacos", href: "/categoria/tacos", icon: UtensilsCrossed },
    { tKey: "nav.drinks", href: "/categoria/bebidas", icon: Coffee },
    { tKey: "nav.desserts", href: "/categoria/postres", icon: IceCreamBowl },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { t } = useLanguage();

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-border h-screen sticky top-0 py-6 px-4">
            {/* Logo */}
            <div className="mb-10 mt-2 px-2 flex flex-col">
                <span className="text-2xl font-black text-primary tracking-tight">GastroDirect</span>
                <span className="text-[10px] text-primary/80 font-bold uppercase tracking-widest mt-0.5">Comida a domicilio</span>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.tKey}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-r-full transition-colors font-medium text-sm
                ${isActive
                                    ? "bg-primary text-white shadow-md shadow-primary/20"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                }
              `}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{t(item.tKey)}</span>
                        </Link>
                    );
                })}
                {/* Extra Link at bottom */}
                <div className="mt-auto mb-4">
                    <Link
                        href="/nosotros"
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-r-full transition-colors font-medium text-sm
                ${pathname.startsWith('/nosotros')
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                            }
              `}
                    >
                        <Info className="w-5 h-5" />
                        <span>{t("nav.about")}</span>
                    </Link>
                </div>
            </nav>
        </aside>
    );
}
