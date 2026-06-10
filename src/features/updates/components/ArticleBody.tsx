import React from "react";

interface ArticleBodyProps {
  content: string;
}

export function ArticleBody({ content }: ArticleBodyProps) {
  if (!content) return null;

  // Split by double newline to detect major sections/paragraphs
  const sections = content.split(/\n\n+/);

  return (
    <div className="mt-8 space-y-8">
      {sections.map((section, i) => {
        const lines = section.split("\n");

        return (
          <div key={i} className="space-y-4">
            {lines.map((line, li) => {
              const trimmedLine = line.trim();
              if (!trimmedLine) return null;

              // Check for headers (starts with # or ends with colon)
              const isHeader = /^#+\s/.test(trimmedLine) || trimmedLine.endsWith(":");
              
              // Check for list items
              const isListItem = /^[•\-\*]\s/.test(trimmedLine);

              // Check for images ![alt](url)
              const isImage = /^!\[(.*?)\]\((.*?)\)$/.test(trimmedLine);

              if (isImage) {
                const match = trimmedLine.match(/^!\[(.*?)\]\((.*?)\)$/);
                if (match) {
                  const alt = match[1];
                  const src = match[2];
                  return (
                    <div key={li} className="my-10 overflow-hidden rounded-2xl shadow-xl">
                      <img
                        src={src}
                        alt={alt}
                        className="w-full object-cover"
                        loading="lazy"
                      />
                      {alt && (
                        <p className="mt-3 text-center text-sm font-bold uppercase tracking-widest text-slate-400">
                          {alt}
                        </p>
                      )}
                    </div>
                  );
                }
              }

              if (isHeader) {
                // Remove leading # for markdown headers
                const headerText = trimmedLine.replace(/^#+\s/, '');
                return (
                  <h3
                    key={li}
                    className="text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl mt-6"
                  >
                    {headerText}
                  </h3>
                );
              }

              if (isListItem) {
                // Remove bullet symbol
                const listText = trimmedLine.replace(/^[•\-\*]\s/, '');
                return (
                  <div key={li} className="flex items-start gap-3 ml-4">
                    <span className="text-orange-600 mt-1.5">•</span>
                    <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl md:leading-loose">
                      {listText}
                    </p>
                  </div>
                );
              }

              // Normal paragraph line
              return (
                <p
                  key={li}
                  className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl md:leading-loose"
                >
                  {trimmedLine}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
