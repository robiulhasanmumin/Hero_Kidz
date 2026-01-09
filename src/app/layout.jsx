import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import localFont from 'next/font/local'
import NextAuthProvider from "@/provider/NextAuthProvider";


const poppins = Poppins(
  {
    weight:["100","200","400","500","600","800"]
  }
)
export const fontBangla = localFont({
  src: '../fonts/mayaboti-normal.ttf',
})

export const metadata = {
  title: {
    default: "Hero Kidz - শিশুদের শিক্ষামূলক খেলনার সেরা শপ",
    template: "%s | Hero Kidz",
  },
  description: "শিশুদের মেধা বিকাশে সহায়ক সেরা মানের শিক্ষামূলক খেলনা এবং লার্নিং বোর্ড পাওয়া যাচ্ছে Hero Kidz-এ।",
  metadataBase: new URL("https://hero-kidz-kohl.vercel.app/"), // আপনার আসল ডোমেইন দিন
  
  // সোশ্যাল মিডিয়া শেয়ারিং (Open Graph)
  openGraph: {
    title: "Hero Kidz - Fun & Educational Toys",
    description: "শিশুদের জন্য সেরা সব শিক্ষামূলক খেলনা খুঁজে নিন আমাদের কাছে।",
    url: "https://hero-kidz.vercel.app",
    siteName: "Hero Kidz",
    images: [
      {
        url: "https://i.ibb.co.com/BVY03vh3/image.png", // আপনার হোম পেজ প্রিভিউ
        width: 1200,
        height: 630,
        alt: "Hero Kidz Home Preview",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },

  // টুইটার মেটাডেটা
  twitter: {
    card: "summary_large_image",
    title: "Hero Kidz - Best Learning Toys",
    description: "Best quality educational toys in Bangladesh.",
    images: ["https://i.ibb.co.com/BVY03vh3/image.png"], 
  },

  // ফেভিকন এবং লোগো আইকন
  icons: {
    icon: "https://i.ibb.co.com/ZR06XWXW/image.png", // আপনার লোগো
    apple: "https://i.ibb.co.com/ZR06XWXW/image.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <header className="md:w-11/12 mx-auto py-2">
          <Navbar></Navbar>
        </header>
        <main className="md:w-11/12 mx-auto py-2 min-h-[calc(100vh-302px)]">
        {children}
        </main>
        <footer>
          <Footer></Footer>
        </footer>
      </body>
    </html>
    </NextAuthProvider>
  );
}
