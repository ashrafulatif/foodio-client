"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Food Menu" },
  { href: "/orders", label: "My Orders" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center h-6.5 w-[106.09px] relative">
          <Image src="/Logo.svg" alt="Logo" fill className="object-contain" />
        </div>

        {/* Navigation Links */}
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

        {/* Right Section: Cart & Sign In */}
        <div className="flex items-center gap-3">
          {/* Shopping Cart — outlined pill */}
          <div className="flex items-center gap-2 border border-primary rounded-full px-3 py-1.5 cursor-pointer hover:border-gray-500 transition-colors">
            <ShoppingCart className="w-4 h-4 text-primary font-semibold" />
            <span className="text-sm font-semibold text-primary">2</span>
          </div>

          {/* Sign In Button */}
          <Link
            href={"/login"}
            className="bg-primary hover:bg-[#234f3c] text-white rounded-full px-3 py-1.5 text-sm font-semibold flex items-center gap-2"
          >
            Sign in
            <span className="text-base">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
