import { redirect } from "next/navigation";
export default function Home() {
  redirect("/dashboard/Payouts & Wallets?tab=revenue");
}
