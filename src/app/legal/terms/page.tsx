'use client'
import Footer from "@/components/footer/common";
import Header from "@/components/header/common";
import Link from "next/link";

export default function Terms() {
  
    return (
        <>
          <Header />
          <div className="flex min-h-screen h-full flex-col items-center w-full overflow-x-hidden py-40 px-4">
            <div className="w-full max-w-[1500px] flex-col flex p-10 bg-white/5 border border-white/10 rounded-xl">
                <h1 className="text-2xl font-black">Terms & Conditions</h1>
                <p className="text-sm text-zinc-400">Last Updated: 4th March, 2025</p>

                <br />

                <h2 className="text-lg font-bold">1. Introduction</h2>
                <p className="text-sm text-zinc-400">Welcome to Ghostboard (&quot;the Platform&quot;), operated by Ghost Board LLC (&quot;the Company&quot;), a US-based company. By using our Platform, you agree to these Terms & Conditions.</p> <br />

                <h2 className="text-lg font-bold">2. Eligibility</h2>
                <p className="text-sm text-zinc-400">
                The Platform is intended for residents of the United States only.</p> <br />

                <h2 className="text-lg font-bold">3. Services</h2>
                <p className="text-sm text-zinc-400">We provide AI-driven trading insights and analysis. <br />
                Access is available via subscription, with a 7-day free trial.</p> <br />

                <h2 className="text-lg font-bold">4. User Responsibilities</h2>
                <p className="text-sm text-zinc-400">You must provide accurate name and email during signup. <br />
                You are responsible for maintaining your account security.</p> <br />

                <h2 className="text-lg font-bold">5. Payments and Billing</h2>
                <p className="text-sm text-zinc-400">Payments are securely processed via Stripe. <br />
                Subscriptions auto-renew unless canceled before the billing date.</p> <br />

                <h2 className="text-lg font-bold">6. Refund Policy</h2>
                <p className="text-sm text-zinc-400">Ghost Board LLC does not offer refunds under any circumstances. <br />
                We provide a 7-day free trial for evaluation.</p> <br />

                <h2 className="text-lg font-bold">7. Prohibited Activities</h2>
                <p className="text-sm text-zinc-400">Unauthorized access, scraping, or misuse of the Platform is prohibited. <br />
                Any violation may result in account termination.</p> <br />

                <h2 className="text-lg font-bold">8. Limitation of Liability</h2>
                <p className="text-sm text-zinc-400">We are not responsible for financial losses or trading decisions based on the Platform&apos;s data.</p> <br />

                <h2 className="text-lg font-bold">9. Modifications</h2>
                <p className="text-sm text-zinc-400">Ghost Board LLC reserves the right to modify these Terms at any time. Changes will be posted on <Link href={'/legal/terms'} className="text-primaryLight">ghostboard.net/legal/terms</Link>.</p> <br />

                <h2 className="text-lg font-bold">10. Contact Information</h2>
                <p className="text-sm text-zinc-400">For any inquiries, contact us at <Link href={'mailto:support@ghostboard.net'} className="text-primaryLight">support@ghostboard.net</Link>.</p> <br />
            </div>
          </div>
          <Footer />
        </>
      );
}