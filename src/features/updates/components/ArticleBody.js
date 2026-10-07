import React from "react";



export function ArticleBody({ content }) {
  if (!content) return null;

  // Custom parser to handle LLM markdown artifacts and excessive bolding
  let parsedContent = content;
  
  // Convert markdown bold to HTML if any leaked through
  parsedContent = parsedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Un-bold entire paragraphs, list items, and table cells
  parsedContent = parsedContent.replace(/<p>\s*<strong>(.*?)<\/strong>\s*<\/p>/g, '<p>$1</p>');
  parsedContent = parsedContent.replace(/<li>\s*<strong>(.*?)<\/strong>\s*<\/li>/g, '<li>$1</li>');
  parsedContent = parsedContent.replace(/<td>\s*<strong>(.*?)<\/strong>\s*<\/td>/g, '<td>$1</td>');
  
  // Handle inverted bolding (strong wrapping block elements)
  parsedContent = parsedContent.replace(/<strong>\s*<p>(.*?)<\/p>\s*<\/strong>/g, '<p>$1</p>');

  return (
    <div 
      className="wp-content mt-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl md:leading-loose"
      dangerouslySetInnerHTML={{ __html: parsedContent }}
    />
  );
}
