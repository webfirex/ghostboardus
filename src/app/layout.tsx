import '@mantine/core/styles.css';
import "./globals.css";
import '@mantine/notifications/styles.css';
import { Notifications } from "@mantine/notifications";

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
// import Footer from '@/components/footer/common';

export const metadata = {
  title: 'Ghostboard',
  description: 'Ghostboard - Stocks and Trading',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GhostBoard" />

        <meta property="og:title" content="👋 Say Hello to GhostBoard 2.0!" />
        <meta property="og:description" content="The wait is over — GhostBoard 2.0 is here! With a stunning new dashboard, smarter insights, and enhanced features,
        it's time to level up your trading experience" />
        <meta property="og:image" content="https://i.ibb.co/x2cCjQP/Whats-App-Image-2025-01-24-at-02-37-54.jpg" />
        {/* <meta property="og:url" content="https://ghostboard.net" /> */}
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="👋 Say Hello to GhostBoard 2.0!" />
        <meta name="twitter:description" content="The wait is over — GhostBoard 2.0 is here! With a stunning new dashboard, smarter insights, and enhanced features, it's time to level up your trading experience." />
        <meta name="twitter:image" content="https://i.ibb.co/x2cCjQP/Whats-App-Image-2025-01-24-at-02-37-54.jpg" />
        <meta name="facebook-domain-verification" content="xndbhauhq822bf87ukdtie4clxwekg" />
        
        <link rel="icon" href="https://ghostboard.net/favicon.png" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '2197070084040958');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src="https://www.facebook.com/tr?id=2197070084040958&ev=PageView&noscript=1"
            />
          </noscript>
      </head>
      <body className='relative'>
        <MantineProvider defaultColorScheme="dark">
          <Notifications position={'bottom-right'} className=" scale-5" />
          {children}
          {/* <Footer /> */}
        </MantineProvider>
      </body>
    </html>
  );
}