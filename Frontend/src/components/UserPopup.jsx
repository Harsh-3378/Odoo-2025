'use client';

import { BadgeCheck, Bell, ChevronDown, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { logoutUser } from '@/state/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';

export function NavUser({
                            user,
                        }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isMobile } = useSidebar();
    function logoutUserFn() {
        dispatch(logoutUser());
        navigate('/login',{replace: true})
    }
    function FirstLetter(name) {
        return name.charAt(0).toUpperCase();
    }
    const firstLetter = FirstLetter(user.name || user.email || 'N'
    );
    const avatarFallback = firstLetter;
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='w-full '>
                        <SidebarMenuButton className='p-1'>
                            <Avatar className='h-8 w-8 rounded-lg'>
                                <AvatarImage src={user.profileImage} alt={user.name} />
                                <AvatarFallback className='rounded-xl bg-primary text-background font-bold'>
                                    {avatarFallback}
                                </AvatarFallback>
                            </Avatar>
                            {/* <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-bold text-[12px]'>Nayan Sukhadiya</span>
                <span className='truncate text-xs'>User</span>
              </div> */}
                            {/* <div className='flex items-center justify-center'>
                <ChevronDown className='h-4 w-4 text-accent-foreground' />
              </div> */}
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-2xl blur-background-div mt-3'
                        side={'bottom'}
                        align='end'
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className='p-0 font-normal'>
                            <div className='flex items-center gap-2 px-2 py-1.5 text-left text-sm bg-accent rounded-2xl'>
                                <Avatar className='h-8 w-8 rounded-lg'>
                                    <AvatarImage src={user.profileImage} alt={user.name} />
                                    <AvatarFallback className='rounded-xl bg-primary text-background font-bold'>
                                        {avatarFallback}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-medium'>{user.name}</span>
                                    <span className='truncate text-xs'>{user.role}</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 px-1 py-1.5 w-full'>
                                <ModeToggle />
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logoutUserFn} className='text-red-500'>
                            <LogOut className='text-red-500'/>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
