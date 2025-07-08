import React from "react";
import Menu from "@/components/admin/Menu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Login from "@/app/(auth)/login/Login";

export const metadata = {
  title: "Car Listing Admin",
  description: "Car Listing Admin Dashboard",
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <>
      {currentUser ? (
        <div className="h-screen flex" id="AdminImage">
          <div className="hidden md:block w-[18%]">
            <Menu role={currentUser?.role} />
          </div>
          <div className="w-[100%] md:w-[82%] overflow-scroll flex flex-col">
            {children}
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default AdminLayout;
