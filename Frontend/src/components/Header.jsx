// import { selectCurrentUser } from '@/state/authSlice';
import { NavMain } from "@/components/sidebar/navMain.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { selectCurrentUser } from "@/state/authSlice.js";
import { useSelector } from "react-redux";

export default function Header({ className }) {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <header
      className={`${className} fixed z-50 w-full bg-background/20 backdrop-blur-md rounded-[4px] shadow-sm border-b border-border flex items-center justify-between py-3 px-4`}
    >
      <img src="/logo.png" alt="Logo" className="h-7" />
      <Separator orientation="vertical" className="" />
      {/*<ModeToggle />*/}
      {currentUser && (
        <div className="flex items-center justify-center gap-1">
          <div className="flex items-center justify-center">
            <NavMain user={currentUser} />
          </div>
        </div>
      )}
    </header>
  );
}
