import { permanentRedirect } from "next/navigation";

export default function InvestmentRedirectPage() {
  permanentRedirect("/investment-guide");
}
