import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-[1400px]",
  full: "max-w-full"
};

export const PageContainer = ({ children, maxWidth = "xl" }: PageContainerProps) => {
  return (
    <div className={`mx-auto px-6 ${maxWidthClasses[maxWidth]}`}>
      {children}
    </div>
  );
};
