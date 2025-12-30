import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type PageButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface PaginationProps {
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
  handleFirstPage: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
  handleLastPage: () => void;
}

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

export default function Pagination({
  isPreviousDisabled,
  isNextDisabled,
  handleFirstPage,
  handlePrevious,
  handleNext,
  handleLastPage,
}: PaginationProps) {
  return (
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
  );
}
