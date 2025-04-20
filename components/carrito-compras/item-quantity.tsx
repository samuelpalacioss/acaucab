import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ItemQuantityProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

export function ItemQuantity({
  quantity,
  onIncrease,
  onDecrease,
  minQuantity = 1,
  maxQuantity = 99,
}: ItemQuantityProps) {
  const isDecrementDisabled = quantity <= minQuantity;
  const isIncrementDisabled = quantity >= maxQuantity;

  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none rounded-l-md"
        onClick={onDecrease}
        disabled={isDecrementDisabled}
        aria-label="Disminuir cantidad"
      >
        <Minus className="h-3 w-3" />
      </Button>

      <span className="w-8 text-center">{quantity}</span>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-none rounded-r-md"
        onClick={onIncrease}
        disabled={isIncrementDisabled}
        aria-label="Aumentar cantidad"
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
