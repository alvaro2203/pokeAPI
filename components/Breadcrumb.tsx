import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  name: string;
}

export default function Breadcrumb({ name }: BreadcrumbProps) {
  return (
    <div className="flex gap-2 items-center">
      <Link href="/" className="underline hover:text-yellow-300">
        Home
      </Link>
      <ChevronRight size={15} />
      <h1>{name}</h1>
    </div>
  );
}
