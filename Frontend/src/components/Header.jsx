// import { selectCurrentUser } from '@/state/authSlice';
import { NavMain } from "@/components/sidebar/navMain.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { selectCurrentUser } from "@/state/authSlice.js";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Header({ className }) {
  const currentUser = useSelector(selectCurrentUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header
      className={`${className} fixed z-50 w-full bg-background/20 backdrop-blur-md rounded-[4px] shadow-sm border-b border-border flex items-center justify-between py-3 px-4`}
    >
      <img src="/logo.png" alt="Logo" className="h-7" />
      <Separator orientation="vertical" className="" />
      {/*<ModeToggle />*/}
      {currentUser && (
        <div className="flex items-center justify-center gap-1" ref={dropdownRef}>
          <div className="flex items-center justify-center">
            <NavMain user={currentUser} />
          </div>
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 py-1 rounded hover:bg-accent/30 transition"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              <img
                src={currentUser.avatar || "/default-avatar.png"}
                alt="User"
                className="w-8 h-8 rounded-full border"
              />
              <span className="font-medium">{currentUser.name || currentUser.username}</span>
              <svg
                className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  Signed in as <b>{currentUser.email}</b>
                </div>
                <ul>
                  <li>
                    <a href="/dashboard" className="block px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Profile
                    </a>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
