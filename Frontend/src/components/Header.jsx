import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  MoreVertical, 
  Settings, 
  User, 
  Wallet, 
  Package, 
  LogOut,
  Bell,
  Search,
  Heart,
  ShoppingBag,
  Recycle
} from 'lucide-react';
import { SidebarTrigger } from "@/components/ui/sidebar.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { ModeToggle } from "@/components/ThemeProvider/modeToggle.jsx";
import { useSelector } from 'react-redux';
import { NavMain } from "@/components/sidebar/navMain.jsx";
import { selectCurrentUser } from "@/state/authSlice.js";

export default function Header({ className }) {
  const currentUser = useSelector(selectCurrentUser);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileItemClick = (item) => {
    setIsProfileOpen(false);
    // Handle navigation based on item
    console.log(`Navigating to: ${item}`);
    // Add your navigation logic here
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
    }
  };

  return (
    <header className={`${className} fixed z-50 w-full bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50`}>
      <div className="flex items-center justify-between py-3 px-4 max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Recycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:block">
              Re<span className="text-primary">Wear</span>
            </span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for clothes, styles, or brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-2">
            <button className="p-2 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button className="p-2 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button className="p-2 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-chart-2 text-white text-xs rounded-full flex items-center justify-center">
                1
              </span>
            </button>
          </div>

          <Separator orientation="vertical" className="h-6 hidden sm:block" />

          {/* Theme Toggle */}
          <ModeToggle />

          {/* User Profile */}
          {currentUser && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                onMouseEnter={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 p-2 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                  {currentUser.avatar ? (
                    <img 
                      src={currentUser.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-primary-foreground" />
                  )}
                </div>
                <span className="text-sm font-medium hidden lg:block">
                  {currentUser.firstName || currentUser.name || 'User'}
                </span>
                <ChevronDown className={`w-4 h-4 hidden lg:block transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg py-2 z-50"
                  onMouseLeave={() => setIsProfileOpen(false)}
                >
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                        {currentUser.avatar ? (
                          <img 
                            src={currentUser.avatar} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-6 h-6 text-primary-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-popover-foreground truncate">
                          {currentUser.firstName && currentUser.lastName 
                            ? `${currentUser.firstName} ${currentUser.lastName}`
                            : currentUser.name || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={() => handleProfileItemClick('profile')}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </button>
                    <button
                      onClick={() => handleProfileItemClick('wallet')}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Wallet className="w-4 h-4" />
                      Wallet
                      <span className="ml-auto text-xs bg-chart-2 text-white px-1.5 py-0.5 rounded-full">
                        120 pts
                      </span>
                    </button>
                    <button
                      onClick={() => handleProfileItemClick('orders')}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      My Orders
                    </button>
                    <button
                      onClick={() => handleProfileItemClick('settings')}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-border pt-1">
                    <button
                      onClick={() => handleProfileItemClick('logout')}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation for non-authenticated users */}
          {!currentUser && (
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                Sign In
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
                Join ReWear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search clothing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
          />
        </form>
      </div>
    </header>
  );
}