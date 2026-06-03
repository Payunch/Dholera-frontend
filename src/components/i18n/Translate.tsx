"use client";
import React from 'react';
import { useLanguage } from '@/providers/LanguageProvider';

export function Translate({ id }: { id: string }) {
  const { t } = useLanguage();
  return <>{t(id)}</>;
}
