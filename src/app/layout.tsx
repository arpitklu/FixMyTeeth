import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import UserSync from "@/components/UserSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FixMyTeeth - AI Powered Dental Assistant",
  description: "Get instant Dental Advise through Voice Calls with our AI Assistant. Available 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary:"#10B981",
          colorBackground: "#f3f4f6",
          colorText: "#10B981",
          colorTextSecondary: "#6b7280",
          colorInputBackground: "#f3f4f6",
        }
      }}
    >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
          <UserSync />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
