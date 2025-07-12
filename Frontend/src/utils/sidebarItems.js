import {
    BookOpen,
    Calendar,
    Frame,
    Settings as Gear,
    Grid3x3,
    Home,
    UsersRound,
} from "lucide-react";

export const iconMap = {
    Home,
    Calendar,
    Grid3x3,
    BookOpen,
    UsersRound,
    Frame,
    Gear,
};
export const data = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: "Home",
    },
    {
        title: "demo",
        url: "#",
        icon: "Frame",
        items: [
            {
                title: "submenu 1",
                url: "/submenu1",
            },
            {
                title: "submenu 2",
                url: "/submenu2",
            },
        ],
    },
    {
        title: "Settings",
        url: "/settings",
        icon: "Gear",
    },
];
