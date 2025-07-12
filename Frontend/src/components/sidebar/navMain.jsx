import { ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

// Accepts: user, items (array)
export function NavMain({ user, items = [] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-1 rounded hover:bg-accent/30 transition-colors">
          <span className="font-semibold">Menu</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        {items.map((item) =>
          item.items?.length ? (
            <DropdownMenuSub key={item.title}>
              <DropdownMenuSubTrigger className="flex items-center gap-2">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {item.items.map((subItem) => (
                  <DropdownMenuItem asChild key={subItem.title}>
                    <Link to={subItem.url}>
                      <span>{subItem.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem asChild key={item.title}>
              <Link to={item.url} className="flex items-center gap-2">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}