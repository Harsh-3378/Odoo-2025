// import { selectCurrentUser } from '@/state/authSlice';
import { ChevronDown, MoreVertical, Settings } from 'lucide-react';
import {SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {ModeToggle} from "@/components/ThemeProvider/modeToggle.jsx";
import { useSelector } from 'react-redux';
import {NavMain} from "@/components/sidebar/navMain.jsx";
import {selectCurrentUser} from "@/state/authSlice.js";

export default function Header({className}) {
  const currentUser = useSelector(selectCurrentUser);
  return (
      <header className={`${className} fixed z-50 w-full bg-background/20 backdrop-blur-md rounded-[4px] shadow-sm border-b border-border flex items-center justify-between py-3 px-4`}>
        <SidebarTrigger className='' />
        <Separator orientation='vertical' className='' />
        {/*<ModeToggle />*/}
        {currentUser && (
            <div className='flex items-center justify-center gap-1'>
              <div className='flex items-center justify-center'>
                <NavMain user={currentUser} />
              </div>
            </div>
        )}
      </header>
  );
}
