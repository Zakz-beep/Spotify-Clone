import type { Metadata } from "next";
import {Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { SupabaseClient } from "@supabase/supabase-js";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUser from "@/actions/getSongsByUser";
import Player from "@/components/Player";

const font = Figtree({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Spotify Dev",
};
export const revalidate = 0

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUser()
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      > 
      <ToasterProvider />
      <SupabaseProvider>
        <UserProvider>
          <ModalProvider />
        <Sidebar songs={userSongs}>
          {children}
        </Sidebar>
        <Player />
        </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
