import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* dashboard sidebar */}
      <DashboardSidebar />
      <div className="flext flex-1 flex-col overflow-hidden">
        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
