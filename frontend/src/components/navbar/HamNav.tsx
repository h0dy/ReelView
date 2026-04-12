import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LucideAlignLeft } from "lucide-react";

import { navLinks } from "@/utils/links";
import { Button } from "../ui/button";
import HamNavItem from "./HamNavItem";

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
            return (
              <DropdownMenuItem key={link.href} className="cursor-pointer">
                <HamNavItem link={link} />
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HamNav;
