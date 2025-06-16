import React from "react";
import { cn } from "@/lib/utils"; // 任意のclassNameマージ関数

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded shadow-sm hover:shadow-md transition-all hover:scale-[1.02]",
        className
      )}
    >
      {children}
    </div>
  );
};
