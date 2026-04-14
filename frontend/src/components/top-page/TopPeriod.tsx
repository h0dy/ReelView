import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Dispatch } from "react";

const TopPeriod = ({
  period,
  setPeriod,
}: {
  period: string;
  setPeriod: Dispatch<string>;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="default"
          className="cursor-pointer ml-3 relative text-base"
        >
          {period}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-20">
        <DropdownMenuLabel>Period</DropdownMenuLabel>
        <div className="border-b border-gray-600 dark:border-gray-400" />
        <DropdownMenuRadioGroup value={period} onValueChange={setPeriod}>
          <DropdownMenuRadioItem value="day" className="cursor-pointer">
            Today
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="week" className="cursor-pointer">
            This week
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TopPeriod;
