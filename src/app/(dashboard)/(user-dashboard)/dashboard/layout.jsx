import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/header/DashboardHeader";
import { getServerPrincipal } from "@/lib/auth-server";

export default async function DashboardLayout({ children }) {
  const principal = await getServerPrincipal(await headers());

  if (!principal) {
    redirect("/auth");
  }

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <DashboardHeader user={principal} />
      <div className="flex pt-16">
        <DashboardSidebar user={principal} />
        <main className="ml-0 flex-1 p-6 lg:ml-64 lg:p-8">
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
