import { redirect } from 'next/navigation';

export const metadata = {
  title: "Admin Master Control | Dholera Platform",
  robots: "noindex, nofollow",
};

export default async function AdminDashboardPage() {
  // Since we are using the side-menu layout now, the dashboard root just redirects to leads
  redirect('/admin/leads');
}
