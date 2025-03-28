'use client'
import Footer from "@/components/footer/common";
import Header from "@/components/header/common";
import Link from "next/link";

export default function Privacy() {
  
  return (
    <>
      <Header />
      <div className="flex min-h-screen h-full flex-col items-center w-full overflow-x-hidden py-40 px-4">
        <div className="w-full max-w-[1500px] flex-col flex p-10 bg-white/5 border border-white/10 rounded-xl">
            <h1 className="text-2xl font-black">Privacy Policy</h1>
            <p className="text-sm text-zinc-400"> Last Updated: 4th March, 2025</p>

            <br />

            <h2 className="text-lg font-bold">1. Introduction</h2>
            <p className="text-sm text-zinc-400">Ghost Board LLC values your privacy and is committed to protecting your personal information.</p> <br />

            <h2 className="text-lg font-bold">2. Information We Collect</h2>
            <p className="text-sm text-zinc-400">Personal Information: Name, email address (collected during signup). <br />
            Payment Information: Handled securely by Stripe; we do not store payment details. <br />
            Usage Data: Information about how you interact with the Platform to improve user experience.</p> <br />

            <h2 className="text-lg font-bold">3. How We Use Your Information</h2>
            <p className="text-sm text-zinc-400">To provide and improve the Platform. <br />
            To communicate important updates or announcements. <br />
            To comply with legal requirements. <br /></p> <br />

            <h2 className="text-lg font-bold">4. Sharing Your Information</h2>
            <p className="text-sm text-zinc-400">We do not sell or share your personal data with third parties, except with Stripe for payment processing or as required by law.</p> <br />

            <h2 className="text-lg font-bold">5. Data Security</h2>
            <p className="text-sm text-zinc-400">Your data is stored securely with encryption and industry-standard measures.</p> <br />

            <h2 className="text-lg font-bold">6. Cookies</h2>
            <p className="text-sm text-zinc-400">The Platform uses cookies to enhance user experience. By using the Platform, you consent to our cookie policy.</p> <br />

            <h2 className="text-lg font-bold">7. Data Retention</h2>
            <p className="text-sm text-zinc-400">Personal data will be retained as long as you have an active account.</p> <br />

            <h2 className="text-lg font-bold">8. Your Rights</h2>
            <p className="text-sm text-zinc-400">You may request access, correction, or deletion of your personal information by contacting <Link href={'mailto:support@ghostboard.net'} className="text-primaryLight">support@ghostboard.net</Link></p> <br />
        
            <h2 className="text-lg font-bold">9. Updates to This Policy</h2>
            <p className="text-sm text-zinc-400">Ghost Board LLC reserves the right to update this Privacy Policy at any time. Changes will be posted on <Link href={'/legal/privacy'} className="text-primaryLight">ghostboard.net/legal/privacy</Link>.</p> <br />

            <h2 className="text-lg font-bold">10. Contact Information</h2>
            <p className="text-sm text-zinc-400">For privacy-related inquiries, email us at <Link href={'mailto:support@ghostboard.net'} className="text-primaryLight">support@ghostboard.net</Link>.</p> <br />
        </div>
      </div>
      <Footer />
    </>
  );
}