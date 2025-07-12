"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavMain } from "./navMain.jsx";
import { data, iconMap } from "@/utils/sidebarItems"; // <-- import sidebar items and iconMap

// Remove role-based filtering, just map all items
const getSidebarItems = (items) =>
  items
    .filter((item) => item.title !== "Settings")
    .map((item) => {
      const iconComponent = iconMap[item.icon];
      const newItem = {
        ...item,
        icon: iconComponent,
      };

      if (item.items) {
        newItem.items = item.items.map((subItem) => ({
          ...subItem,
          icon: iconMap[subItem.icon] ?? undefined,
        }));
      }

      return newItem;
    });

// Get settings item for the footer
const getSettingsItem = () => {
  const settingsItem = data.find((item) => item.title === "Settings");
  if (settingsItem) {
    return {
      ...settingsItem,
      icon: iconMap[settingsItem.icon],
    };
  }
  return null;
};

export function AppSidebar({ ...props }) {
  const { state } = useSidebar();
  const filteredData = getSidebarItems(data);
  const settingsItem = getSettingsItem();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div
          className={`${
            state === "collapsed" ? "h-16 py-2" : "h-24"
          } w-full flex items-center justify-center border-b border-border/70`}
        >
          {state === "collapsed" ? (
            <img src="/scheduler_logo/Logo.svg" alt="Logo" className="h-7" />
          ) : (
            <>
              <img
                src="/scheduler_logo/Full_logo.svg"
                alt="Logo"
                className="h-8 w-auto hidden dark:block"
              />
              <img
                src="/scheduler_logo/Full_Logo_Blue.svg"
                alt="Logo"
                className="h-8 w-auto block dark:hidden"
              />
            </>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="block p-0 w-full">
        <NavMain items={filteredData} />
      </SidebarContent>
      <SidebarFooter className="block p-0 w-full">
        {settingsItem && <NavMain items={[settingsItem]} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
