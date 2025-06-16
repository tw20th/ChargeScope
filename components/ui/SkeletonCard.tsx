type Props = {
  aspect?: "square" | "video";
};

export const SkeletonCard = ({ aspect = "square" }: Props) => {
  return (
    <div className="bg-card rounded shadow-sm animate-pulse">
      <div
        className={`w-full ${
          aspect === "video" ? "aspect-video" : "aspect-square"
        } bg-border`}
      />
      <div className="p-4 space-y-2">
        <div className="h-4 w-2/3 bg-border rounded" />
        <div className="h-3 w-1/2 bg-border rounded" />
        <div className="flex gap-2">
          <div className="h-5 w-12 bg-border rounded-full" />
          <div className="h-5 w-12 bg-border rounded-full" />
        </div>
        <div className="h-4 w-1/3 bg-border rounded ml-auto" />
      </div>
    </div>
  );
};
