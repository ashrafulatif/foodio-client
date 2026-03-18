"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { NavSection } from "@/types/dashboard.type";
import { LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { logoutAction } from "@/actions/auth.action";
import { useAuth } from "@/context/authContext";

interface DashboardSidebarContentProps {
  navItems: NavSection[];
  dashboardHome: string;
}

export const DashboardSidebarContent = ({
  dashboardHome,
  navItems,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsLoggedIn, setRole } = useAuth();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      setIsLoggedIn(false);
      setRole(null);
      router.push("/login");
    });
  };

  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-card overflow-y-auto">
      {/* Logo / Brand */}
      <div className="flex items-center h-16 justify-left px-4">
        <div className="flex items-center h-6.5 w-[106.09px] relative">
          <Link href={dashboardHome}>
            <Image src="/Logo.svg" alt="Logo" fill className="object-contain" />
          </Link>
        </div>
      </div>

      {/* Navigation Area */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navItems.map((section, sectionId) => (
            <div key={sectionId}>
              <div className="space-y-1">
                {section.items.map((item, itemId) => {
                  const isActive = item.href === pathname;
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      key={itemId}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium transition-all",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </div>

              {sectionId < navItems.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Logout — pinned to bottom */}
      <div className="px-3 py-4 border-t">
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent text-red-500 transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span>{isPending ? "Signing out..." : "Sign out"}</span>
        </button>
      </div>
    </div>
  );
};
