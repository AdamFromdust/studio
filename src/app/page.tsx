"use client";

import KnowledgeBase from '@/components/KnowledgeBase';
import PlantProfile from '@/components/PlantProfile';
import CareLogging from '@/components/CareLogging';
import AIRecommendations from '@/components/AIRecommendations';
import AIHelp from '@/components/AIHelp';
import {SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton} from '@/components/ui/sidebar';
import {Toaster} from '@/components/ui/toaster';
import {Home, BookOpen, Leaf, Lightbulb, HelpCircle} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';



export default function HomePage() {


  return (
    <SidebarProvider>
      <div className="flex h-screen">
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
            <p className="p-4 text-sm">
              Logged out
            </p>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-4 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Debug Section</h2>
            <p>Logged In: No</p>

             
              <Link href="/login">
                <Button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Login
                </Button>
              </Link>
            
          </div>
          <KnowledgeBase />
          <PlantProfile />
          <CareLogging />
          <AIRecommendations />
            <AIHelp/>
        </main>
        <Toaster />
      </div>
    </SidebarProvider>
  );
}

