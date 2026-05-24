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

              // Check for headers (starts with emoji or ends with colon)
              const isHeader = /^(?:[\u{1F300}-\u{1FAFF}]|[#•\-])+/u.test(trimmedLine) || trimmedLine.endsWith(":");

              if (isHeader) {
                return (
                  <h3
                    key={li}
                    className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl"
                  >
                    {trimmedLine}
                  </h3>
                );
              }

              // Normal paragraph line
              return (
                <p
                  key={li}
                  className="text-lg leading-relaxed text-slate-700 md:text-xl md:leading-loose"
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
