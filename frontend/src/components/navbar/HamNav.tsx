import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LucideAlignLeft } from "lucide-react";

import { navLinks } from "@/utils/links";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const HamNav = () => {
  return (
    <div className="sm:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex gap-4 max-w-25 cursor-pointer"
            variant="ghost"
          >
            <div className="">
              <LucideAlignLeft className="size-6 " />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36" align="start" sideOffset={10}>
          {navLinks.map((link) => {
            const { href, label } = link;
            return (
              <DropdownMenuItem key={href} className="cursor-pointer">
                <Link className="capitalize " to={href}>
                  {label}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HamNav;
