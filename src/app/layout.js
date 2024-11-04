import localFont from "next/font/local";
import "./globals.css";
import GradientGlowBackground from "@/components/GradientGlowBackground";
import { ThemeProvider } from "@/providers/theme-provider";
import FloatingMenu from "@/components/FloatingMenu";
import NextTopLoader from "nextjs-toploader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "AI Feature Integration",
  description: "Image classification and Chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
   
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <NextTopLoader color="#F83859" />
        <FloatingMenu/>
        <GradientGlowBackground>
        {children}
        </GradientGlowBackground>
        
      </ThemeProvider>
     
      </body>
    </html>
  );
}
