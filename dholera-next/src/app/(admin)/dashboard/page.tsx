import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminDashboardClient } from "@/features/admin/components/AdminDashboardClient";
import { Lead, WhatsAppStats } from "@/types/admin";
import { API_BASE_URL } from "@/lib/api";

export const metadata: Metadata = {
  title: "Admin Master Control | Dholera Platform",
  robots: "noindex, nofollow",
};

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

  try {
    // Fetch Leads
    const leadsRes = await fetch(`${API_BASE_URL}/leads`, {
      headers: {
        Cookie: allCookies,
      },
      cache: "no-store",
    });

    if (leadsRes.status === 401 || leadsRes.status === 403) {
      redirect("/admin/login");
    }

    const leads: Lead[] = await leadsRes.json();

    // Fetch WA Stats
    const statsRes = await fetch(`${API_BASE_URL}/whatsapp/stats`, {
      headers: {
        Cookie: allCookies,
      },
      cache: "no-store",
    });

    let waStats: WhatsAppStats = {
      totalClicks: 0,
      leadsContacted: 0,
      conversionsAfterWhatsApp: 0,
      responseRate: "Manual",
    };

    if (statsRes.ok) {
      waStats = await statsRes.json();
    }

    return (
      <AdminDashboardClient 
        initialLeads={Array.isArray(leads) ? leads : []} 
        initialWaStats={waStats} 
      />
    );
  } catch (error) {
    console.error("Admin Dashboard SSR Error:", error);
    // In case of network error or other issues, still redirect to login or show error
    redirect("/admin/login");
  }
}
