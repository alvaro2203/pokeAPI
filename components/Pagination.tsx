import { useData } from "@/context/DataContext";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type PageButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const PageButton = ({ className, children, ...props }: PageButtonProps) => {
  return (
    <button
      {...props}
      className={`text-white hover:text-yellow-300 cursor-pointer transition-colors 
        duration-300 disabled:cursor-not-allowed disabled:text-gray-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default function Pagination() {
  const { total, offset, limit: LIMIT, setOffset } = useData();

  const isPreviousDisabled = offset === 0;
  const isNextDisabled = offset + LIMIT >= total;

  const totalPages = Math.ceil(total / LIMIT);

  const handleFirstPage = () => setOffset(0);
  const handleNext = () => offset + LIMIT < total && setOffset(offset + LIMIT);
  const handlePrevious = () => offset - LIMIT >= 0 && setOffset(offset - LIMIT);
  const handleLastPage = () => setOffset((totalPages - 1) * LIMIT);

  const currentPage = Math.ceil((offset + 1) / LIMIT);

  return (
    <>
      <span>Pokemons totales: {total}</span>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <div className="flex space-x-2 items-center">
        <PageButton onClick={handleFirstPage} disabled={isPreviousDisabled}>
          <ChevronsLeft />
        </PageButton>

        <PageButton onClick={handlePrevious} disabled={isPreviousDisabled}>
          <ChevronLeft />
        </PageButton>

        <PageButton onClick={handleNext} disabled={isNextDisabled}>
          <ChevronRight />
        </PageButton>

        <PageButton onClick={handleLastPage} disabled={isNextDisabled}>
          <ChevronsRight />
        </PageButton>
      </div>
    </>
  );
}
