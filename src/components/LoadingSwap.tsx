import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import { ReactNode } from "react";

export function LoadingSwap({
  isLoading,
  children,
  className,
}: {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
}) {
  /**
   * This loader creates 2 same divs using CSS property visibility,
   * which toggling doesn't affect the layout. That means the button wont
   * change in size when loader kicks in or out.
   *
   * (even though here doesn't matter as much because the button has
   *  the style = className="w-full").
   */
  return (
    <div className="grid items-center justify-items-center">
      <div
        className={cn(
          "col-start-1 col-end-1 row-start-1 row-end-1",
          isLoading ? "invisible" : "visible",
          className
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "col-start-1 col-end-1 row-start-1 row-end-1",
          isLoading ? "visible" : "invisible",
          className
        )}
      >
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  );
}
