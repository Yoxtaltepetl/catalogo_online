"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();
    const pathname = usePathname();

    if (pathname === "/nosotros") {
        return null;
    }

    return (
        <footer className="bg-slate-900 text-slate-300 py-10 mt-12 border-t border-slate-800">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">{t('footer.brand')}</h3>
                    <p className="text-sm">
                        {t('footer.desc')}
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">{t('footer.hours.title')}</h4>
                    <ul className="text-sm space-y-2">
                        <li>{t('footer.hours.mf')}</li>
                        <li>{t('footer.hours.we')}</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-white mb-4">{t('footer.info.title')}</h4>
                    <ul className="text-sm space-y-2">
                        <li>
                            <Link href="/checkout" className="hover:text-primary transition-colors">
                                {t('footer.info.terms')}
                            </Link>
                        </li>
                        <li>
                            <Link href="/checkout" className="hover:text-primary transition-colors">
                                {t('footer.info.payment')}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
                &copy; {new Date().getFullYear()} {t('footer.brand')}. {t('footer.rights')}
            </div>
        </footer>
    );
}
