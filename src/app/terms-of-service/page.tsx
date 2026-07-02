import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Dholera Platform",
  description: "Terms of Service for Dholera Platform",
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl text-slate-800 dark:text-slate-200">
      <h1 className="text-4xl font-black mb-8 text-slate-900 dark:text-white">Terms of Service</h1>
      
      <div className="space-y-6 prose prose-slate dark:prose-invert">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Dholera Platform, you accept and agree to be bound by the terms and provisions of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
          <p>
            Dholera Platform provides tools, maps, and information for tracking real estate investments and smart city developments in the Dholera Special Investment Region (SIR). The platform is provided "as is" and for informational purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. User Conduct</h2>
          <p>
            You agree to use the platform only for lawful purposes. You must not use the platform in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Communications</h2>
          <p>
            By submitting your phone number or email address, you consent to receive communications from us regarding your inquiries, including OTP verifications and administrative messages.
          </p>
        </section>
      </div>
    </div>
  );
}
