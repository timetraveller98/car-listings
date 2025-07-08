import {
  LayoutDashboard,
  Users,
  LucideIcon,
  Car,
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
    label: "Listing",
    href: "/admin/listing",
    icon: Car,
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