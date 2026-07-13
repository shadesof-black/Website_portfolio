import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AmbientGlow from '@/components/effects/AmbientGlow';
import CursorGlow from '@/components/effects/CursorGlow';
import GlobalLoader from '@/components/ui/GlobalLoader';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rahulraj.dev'),
  alternates: {
    canonical: 'https://rahulraj.dev',
  },
  title: 'Rahul Raj — AI Engineer & Robotics Developer | rahulraj.dev',
  description:
    'Multidisciplinary engineer building intelligent systems at the intersection of AI, robotics, and embedded systems. Explore projects in computer vision, autonomous robots, and AI-powered applications.',
  keywords: [
    'Rahul Raj',
    'AI Engineer',
    'Robotics Developer',
    'Computer Vision',
    'Machine Learning',
    'Mechanical Engineer',
    'Portfolio',
    'Embedded Systems',
  ],
  authors: [{ name: 'Rahul Raj', url: 'https://rahulraj.dev' }],
  openGraph: {
    title: 'Rahul Raj — AI Engineer & Robotics Developer',
    description:
      'Building intelligent systems at the intersection of AI, robotics, and embedded systems.',
    url: 'https://rahulraj.dev',
    siteName: 'rahulraj.dev',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahul Raj — AI Engineer & Robotics Developer',
    description:
      'Building intelligent systems at the intersection of AI, robotics, and embedded systems.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0f" />

        {/* Preconnect/DNS-prefetch external assets */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://prod.spline.design" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />

        {/* Prevent FOUC for dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />

        {/* Schema.org JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Rahul Raj",
              "url": "https://rahulraj.dev",
              "jobTitle": "AI Engineer & Robotics Developer",
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "UIET, Panjab University"
              },
              "sameAs": [
                "https://github.com/shadesof-black",
                "https://www.linkedin.com/in/26-11-rahul-raj",
                "https://leetcode.com/u/rahul_raj2611/"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-[var(--font-body)] antialiased`}
      >
        <GlobalLoader />
        <AmbientGlow />
        <CursorGlow />
        <Navbar />
        <div className="relative z-10">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
