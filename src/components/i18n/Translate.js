"use client";
import React from'react';
import { useLanguage } from'@/providers/LanguageProvider';

export function Translate({ id }) {
 const { t } = useLanguage();
 return <>{t(id)}</>;
}
