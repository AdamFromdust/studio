"use client";

import type {Metadata} from 'next/server';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import {Button} from "@/components/ui/button"
import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";
import {SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton} from '@/components/ui/sidebar';
import {Home, BookOpen, Leaf, Lightbulb, HelpCircle} from 'lucide-react';
import {metadata} from './metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const session = null;

  useEffect(() => {
    if (session && pathname === '/login') {
      router.push('/');
    }
  }, [session, pathname, router]);


  return (
    <SidebarProvider>
      <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/" isActive>
                <Home />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/knowledgebase">
                <BookOpen />
                <span>Knowledge Base</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/plantprofile">
                <Leaf />
                <span>Plant Profile</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/carelogging">
                <Lightbulb />
                <span>Care Logging</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/airecommendations">
                <HelpCircle />
                <span>AI Recommendations</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/aihelp">
                <HelpCircle />
                <span>AI Help</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/login">
                <HelpCircle />
                <span>Fake</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton href="/login">
                  Login
                </SidebarMenuButton>
            </SidebarMenuItem>

          </SidebarMenu>
          <p className="p-4 text-sm">Logged out</p>
        </SidebarContent>
      </Sidebar>

        {children}
        
      </body>
      </html>
    </SidebarProvider>
  );
}
