import { SquareChevronLeft, SquareChevronRight } from "lucide-react";

interface PaginationProps {
  offset: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

export default function Pagination({
  offset,
  handlePrevious,
  handleNext,
}: PaginationProps) {
  const isPreviousDisabled = offset === 0;
  const isNextDisabled = offset === 10000;

  return (
    <div className="flex gap-10">
      <button
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        className="flex gap-2 hover:text-yellow-300 cursor-pointer transition-colors duration-300 disabled:cursor-not-allowed disabled:text-gray-400"
      >
        <SquareChevronLeft />
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={isNextDisabled}
        className="flex gap-2 hover:text-yellow-300 cursor-pointer transition-colors duration-300"
      >
        Next
        <SquareChevronRight />
      </button>
    </div>
  );
}
