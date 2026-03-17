"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {  User, LogOut, ClipboardList } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { logoutAction } from "@/actions/auth.action";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartDropdown from "../modules/Cart/CartDropdown";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Food Menu" },
  { href: "/orders", label: "My Orders" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      setIsLoggedIn(false);
      router.push("/login");
    });
  };

  return (
    <div className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center h-6.5 w-[106.09px] relative">
          <Image src="/Logo.svg" alt="Logo" fill className="object-contain" />
        </div>

        {/* Nav Links */}
        <nav className="flex items-center gap-2">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`font-medium px-5 py-1.5 rounded-full transition-colors text-sm ${
                  isActive
                    ? "border border-primary bg-secondary text-primary"
                    : "text-[#7A7A7A] hover:bg-secondary"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <CartDropdown />

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-9 h-9 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                  <User className="w-4 h-4 text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-45 rounded-2xl mt-2"
              >
                <DropdownMenuItem asChild>
                  <Link
                    href="/orders"
                    className="flex items-center gap-2 px-4 py-2.5 cursor-pointer"
                  >
                    <ClipboardList className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">My Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  disabled={isPending}
                  className="flex items-center gap-2 px-4 py-2.5 cursor-pointer text-red-500 focus:text-red-500"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">
                    {isPending ? "Logging out..." : "Logout"}
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="bg-primary hover:bg-[#234f3c] text-white rounded-full px-3 py-1.5 text-sm font-semibold flex items-center gap-2"
            >
              Sign in
              <span className="text-base">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
