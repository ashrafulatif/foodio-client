"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  LogOut,
  ClipboardList,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/context/authContext";
import { logoutAction } from "@/actions/auth.action";
import { useState, useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CartDropdown from "../modules/Cart/CartDropdown";
import { UserRole } from "@/types/enum";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Food Menu" },
  { href: "/orders", label: "My Orders" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { isLoggedIn, setIsLoggedIn, role, setRole } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      setIsLoggedIn(false);
      setRole(null);
      router.push("/login");
      setMobileOpen(false);
    });
  };

  return (
    <div className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo — always visible */}
        <Link href="/">
          <div className="flex items-center h-6.5 w-[106.09px] relative shrink-0">
            <Image src="/Logo.svg" alt="Logo" fill className="object-contain" />
          </div>
        </Link>

        {/* Hide everything else on auth pages */}
        {!isAuthPage && (
          <>
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-2">
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

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-3">
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
                    className="w-45 rounded-[6px] mt-2"
                  >
                    {/* Admin/— show Dashboard link */}
                    {role === UserRole.ADMIN ? (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-4 py-2.5 cursor-pointer"
                        >
                          <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <>
                        {/* Customer */}
                        <DropdownMenuItem asChild>
                          <Link
                            href="/"
                            className="flex items-center gap-2 px-4 py-2.5 cursor-pointer"
                          >
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">My Account</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link
                            href="/orders"
                            className="flex items-center gap-2 px-4 py-2.5 cursor-pointer"
                          >
                            <ClipboardList className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">My Orders</span>
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}

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

            {/* Mobile — Cart + Hamburger */}
            <div className="flex md:hidden items-center gap-3">
              <CartDropdown />
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="p-1.5 text-primary"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Drawer — only on non-auth pages */}
      {!isAuthPage && mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-2">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`font-medium px-4 py-2.5 rounded-full transition-colors text-sm ${
                  isActive
                    ? "border border-primary bg-secondary text-primary"
                    : "text-[#7A7A7A] hover:bg-secondary"
                }`}
              >
                {label}
              </Link>
            );
          })}

          <div className="border-t border-border my-2" />

          {isLoggedIn ? (
            <>
              {role === "ADMIN" ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <ClipboardList className="w-4 h-4 text-muted-foreground" />
                  My Orders
                </Link>
              )}
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-red-500 hover:bg-red-50 transition-colors w-fit"
              >
                <LogOut className="w-4 h-4" />
                {isPending ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="bg-primary hover:bg-[#234f3c] text-white rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-2 w-fit"
            >
              Sign in
              <span className="text-base">→</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
