import {
  LayoutDashboard,
  Users,
  LucideIcon,
  User,
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
    label: "Staff",
    href: "/admin/staff",
    icon: User,
    roles: ["SUPERADMIN"],
  },
  {
    label: "Users",
    href: "/admin/user",
    icon: Users,
    roles: ["SUPERADMIN"],
  }
];


export default menuItems;