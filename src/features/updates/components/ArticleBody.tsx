import React from "react";

interface ArticleBodyProps {
  content: string;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  if (!content) return null;

  return (
    <div 
      className="wp-content mt-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl md:leading-loose"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
