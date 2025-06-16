type TagBadgeProps = {
  label: string;
  onClick?: () => void;
  active?: boolean;
};

export const TagBadge = ({ label, onClick, active }: TagBadgeProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2 py-1 rounded-full font-medium transition-colors
        ${
          active
            ? "bg-accent text-white"
            : "bg-accent-light text-accent hover:bg-accent hover:text-white"
        }`}
    >
      {label}
    </button>
  );
};
