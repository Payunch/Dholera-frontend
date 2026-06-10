import { Metadata } from"next";
import { AdminDashboardGate } from"./AdminDashboardGate";

export const metadata: Metadata = {
 title:"Admin Master Control | Dholera Platform",
 robots:"noindex, nofollow",
};

export default async function AdminDashboardPage() {
 return <AdminDashboardGate />;
}
