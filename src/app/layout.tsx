import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Reghunaath — Full-Stack Engineer",
  description:
    "Portfolio of Reghunaath Ajith Kumar Ahila, a full-stack engineer and MS Data Science student at Northeastern University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${plusJakartaSans.variable} ${lora.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
