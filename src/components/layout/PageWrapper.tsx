import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

// PageWrapper adds pt-16 (64px) to offset the fixed header height.
// All inner pages (Products, Cart, etc.) use this so content is never hidden behind the nav.
export const PageWrapper = ({ children, className }: PageWrapperProps) => {
  return (
    <div className={cn("pt-16", className)}>
      {children}
    </div>
  );
};
