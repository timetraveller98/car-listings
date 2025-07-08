import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";

interface NavbarProps {
  name: string | null | undefined;
  email: string | null | undefined;
  closeNavbar: () => void;
}
const DropdownMenu: React.FC<NavbarProps> = ({ closeNavbar, email, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    const callbackUrl = `${window.location.origin}/login`;
    signOut({ redirect: false, callbackUrl }).then(() => {
      router.refresh();
      setIsOpen(false);
      closeNavbar();
    });
  };
  const closeDropdown = () => {
    setIsOpen(false);
    closeNavbar();
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center mt-0 mx-3 px-2 space-x-2">
        <button
          style={{ borderRadius: "7px" }}
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium border text-black  bg-inherit hover:bg-white focus:outline-none"
        >
          <div className="py-0 ">
            {name ? (
              <p className="p-0 m-0 text-[14px] text-secondary">{name}</p>
            ) : (
              <p className="p-0 m-0 text-[14px] text-secondary">Login</p>
            )}
          </div>
          <div className="mt-1 text-secondary">
          <svg
            className="w-4 h-4 ms-2 text-white-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a.75.75 0 01-.53-.22L4.47 7.78a.75.75 0 111.06-1.06L10 10.44l4.47-4.72a.75.75 0 111.06 1.06l-5 5a.75.75 0 01-.53.22z"
              clipRule="evenodd"
            />
          </svg></div>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10"
          role="menu"
        >
          {email ? (
            <div className="py-1" role="none">
              <Link
                href="/admin"
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm text-secondary hover:bg-gray-100"
                role="menuitem"
              >
                Admin
              </Link>
              <hr className="my-1" />
              <a
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-secondary hover:bg-gray-100 cursor-pointer"
                role="menuitem"
              >
                Logout
              </a>
            </div>
          ) : (
            <div className="py-1" role="none">
              <Link
                href="/login"
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm text-secondary hover:bg-gray-100"
                role="menuitem"
              >
                Login
              </Link>
              <hr className="my-1" />
              <Link
                href="/signup"
                onClick={closeDropdown}
                className="block px-4 py-2 text-sm text-secondary hover:bg-gray-100"
                role="menuitem"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
