"use client";

import type {Metadata} from 'next/server';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import {Button} from "@/components/ui/button"
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton} from '@/components/ui/sidebar';
import {Home, BookOpen, Leaf, Lightbulb, HelpCircle} from 'lucide-react';
import {metadata} from './metadata';
import { auth } from './firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {useToast} from "@/hooks/use-toast";

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
  const [session, setSession] = useState<any>(null);
    const {toast} = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);
      } else {
        setSession(null);
        if (pathname !== '/login') {
          router.push('/login');
        }
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);


  const handleSignOut = async () => {
      try {
          await signOut(auth);
          setSession(null);
          router.push('/login');
          toast({
              title: "Logged out successfully",
          })
      } catch (error: any) {
          toast({
              variant: "destructive",
              title: "Error logging out",
              description: error.message,
          })
      }
  };

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
            {session ? (
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleSignOut}>
                            Logout
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ) : (
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/login">
                            Login
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )}

          </SidebarMenu>
          <p className="p-4 text-sm">{session ? `Logged in as ${session?.email}` : 'Logged out'}</p>
        </SidebarContent>
      </Sidebar>

        {children}

      </body>
      </html>
    </SidebarProvider>
  );
}
