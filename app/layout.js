import dynamic from "next/dynamic";
import "./globals.css";
import { fetchData } from "@/lib/fetchData";
import { RootLayoutQuery } from "@/queries/rootLayout.graphql";
//import FloatingButton from "@/components/ContactForm/FloatingButton";
//import Nav from "@/components/Navigation/Nav";
//import NavbarClient from "@/components/Navigation/NavClient";
import { Header } from "@/dev_code/header";
import { cormorant, montserrat, saira } from "@/lib/font";
import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "@/utils";
const Footer = dynamic(() => import("@/components/Footer/Footer"));

const getData = async () => {
  try {
    const { data } = await fetchData(RootLayoutQuery.loc.source.body);
    return data?.rootLayout?.data?.attributes || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data"); // Throw an error to indicate the failure
  }
};

export const metadata = {
  metadataBase: new URL("https://www.eltonjenkinslaw.com"),
  title: "Elton Jenkins Law, P.L.L.C.",
  description:
    "Elton Jenkins Law, P.L.L.C. is a law firm in Oklahoma that specializes in criminal defense, family law, personal injury law, and mediation. The firm values honesty, integrity, and justice and prioritizes its clients. Contact us for a free consultation.",
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default async function RootLayout({ children }) {
  const { navMenu, logo, footer } = await getData();
  return (
    <html lang="en">
      <body
        className={cn(
          "w-screen overflow-x-hidden min-h-screen antialiased",
          `${cormorant} ${montserrat} ${saira}`
        )}
      >
        <Header navMenu={navMenu} logo={logo} />
        {children}
        <Footer footer={footer} />
        <SpeedInsights />
      </body>
      <GoogleTagManager gtmId="GTM-M36SJ6FT" />
    </html>
  );
}
