import { cn } from "@/lib/utils";

interface BadgeProps {
  children: string;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
