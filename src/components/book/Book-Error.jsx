import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export const BookError = ({ error, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-[#1B2B4B]">Something went wrong</h3>
      <p className="mt-2 text-sm text-[#1B2B4B]/60">{error}</p>
      <Button
        onClick={onRetry}
        className="mt-6 rounded-2xl bg-[#C9A84C] px-6 py-3 font-bold text-[#1B2B4B] hover:bg-[#D6B45A]"
      >
        Try Again
      </Button>
    </div>
  );
};