import { selectCurrentUser } from "@/state/authSlice";
import { data as sidebarItems } from "@/utils/sidebarItems";
import { Separator } from "@radix-ui/react-separator";
import { useSelector } from "react-redux";
import { NavMain } from "./sidebar/navMain";

export default function Header() {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <header className="bg-background/30 backdrop-blur-2xl flex items-center justify-between py-3 px-4">
      <img src="/logo.png" alt="Logo" className="h-7" />
      <Separator orientation="vertical" className="" />
      {currentUser && (
        <div className="flex items-center justify-center gap-1">
          <div className="flex items-center justify-center">
            <NavMain user={currentUser} items={sidebarItems} />
          </div>
        </div>
      )}
    </header>
  );
}
