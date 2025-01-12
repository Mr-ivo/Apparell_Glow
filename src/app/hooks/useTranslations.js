'use client';
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function useTranslations() {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const trans = await import(`../translations/${language}.json`);
        setTranslations(trans);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };
    loadTranslations();
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t };
}
