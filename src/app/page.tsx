"use client";

import KnowledgeBase from '@/components/KnowledgeBase';
import PlantProfile from '@/components/PlantProfile';
import CareLogging from '@/components/CareLogging';
import AIRecommendations from '@/components/AIRecommendations';
import AIHelp from '@/components/AIHelp';
import {SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton} from '@/components/ui/sidebar';
import {Toaster} from '@/components/ui/toaster';
import {Home, BookOpen, Leaf, Lightbulb, HelpCircle} from 'lucide-react';


export default function HomePage() {
  

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="#" isActive>
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#knowledgebase">
                  <BookOpen />
                  <span>Knowledge Base</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#plantprofile">
                  <Leaf />
                  <span>Plant Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#carelogging">
                  <Lightbulb />
                  <span>Care Logging</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#airecommendations">
                  <HelpCircle />
                  <span>AI Recommendations</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="#aihelp">
                  <HelpCircle />
                  <span>AI Help</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-4 overflow-y-auto">
          <section id="knowledgebase" className="mb-8">
            <KnowledgeBase />
          </section>
          <section id="plantprofile" className="mb-8">
            <PlantProfile />
          </section>
          <section id="carelogging" className="mb-8">
            <CareLogging />
          </section>
          <section id="airecommendations" className="mb-8">
            <AIRecommendations />
          </section>
          <section id="aihelp" className="mb-8">
            <AIHelp />
          </section>
        </main>
        <Toaster />
      </div>
      
        
      
    </SidebarProvider>
  );
}

