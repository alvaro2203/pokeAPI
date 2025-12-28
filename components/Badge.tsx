import { cn } from "@/lib/utils";

interface BadgeProps {
  children: string;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "px-4 py-2 text-sm font-semibold rounded-full bg-gray-100 text-gray-800 uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
