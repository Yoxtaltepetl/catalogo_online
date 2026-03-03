"use client";

import PromoCarousel from "@/components/PromoCarousel";
import FeaturedSection from "@/components/FeaturedSection";
import { ListFilter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen pb-12">
      <div className="px-6 md:px-10 mt-6">
        <PromoCarousel />
      </div>

      {/* Main Content Area */}
      <section className="py-8 px-6 md:px-10" id="menu">
        <div className="flex items-center justify-between xl:mr-10 mb-8">
          <h2 className="text-2xl font-bold text-foreground">{t("featured.title")}</h2>
          <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
            <ListFilter className="w-5 h-5 text-slate-600 dark:text-slate-300" />
          </button>
        </div>

        <FeaturedSection />
      </section>
    </div>
  );
}
