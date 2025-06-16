import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { TagBadge } from "@/components/ui/TagBadge";

type BlogCardProps = {
  imageUrl: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
};

export const BlogCard = ({
  imageUrl,
  title,
  summary,
  date,
  tags,
}: BlogCardProps) => {
  return (
    <Card className="overflow-hidden">
      <Image
        src={imageUrl}
        alt={title}
        width={800}
        height={450}
        className="w-full aspect-video object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-text font-semibold text-lg">{title}</h3>
        <p className="text-text-muted text-sm line-clamp-3">{summary}</p>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>
        <p className="text-right text-xs text-text-muted">{date}</p>
      </div>
    </Card>
  );
};
