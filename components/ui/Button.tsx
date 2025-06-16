type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ children, onClick, className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-accent text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition ${className}`}
    >
      {children}
    </button>
  );
};
