import {
  LayoutDashboard,
  Users,
  LucideIcon,
} from "lucide-react";

export interface MenuItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  roles: string[];
  subItems?: MenuItem[];
}

const menuItems = [
  {
    label: "Summary",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["ADMIN", "SUPERADMIN"],
  },
  {
    label: "Users",
    href: "/admin/user",
    icon: Users,
    roles: ["SUPERADMIN"],
  }
];


export default menuItems;