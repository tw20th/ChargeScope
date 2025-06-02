"use client";

type TableOfContentsProps = {
  content: string;
};

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const headings = content
    .split("\n")
    .filter((line) => /^#{1,3}\s/.test(line))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length ?? 1;
      const text = line.replace(/^#{1,3}\s/, "").trim();
      const id = text.toLowerCase().replace(/\s+/g, "-");
      return { level, text, id };
    });

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
      <h2 className="text-sm font-semibold mb-2 text-gray-700">目次</h2>
      <ul className="space-y-1 text-sm">
        {headings.map(({ level, text, id }) => (
          <li key={id} className={`pl-${level * 2}`}>
            <a href={`#${id}`} className="text-blue-600 hover:underline">
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
