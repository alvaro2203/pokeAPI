import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="text-2xl font-bold text-white">
      <Loader2 className="animate-spin" size={56} />
    </div>
  );
}
