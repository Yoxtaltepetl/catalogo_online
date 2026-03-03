'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex bg-background/50 backdrop-blur-md rounded-full border border-border p-1 shadow-sm">
            <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${language === 'es'
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
            >
                ES
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${language === 'en'
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
