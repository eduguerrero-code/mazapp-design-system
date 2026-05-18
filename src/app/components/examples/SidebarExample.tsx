import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "../ui/sidebar";
import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";

export default function SidebarExample() {
  const items = [
    { title: "Home", icon: Home },
    { title: "Inbox", icon: Inbox },
    { title: "Calendar", icon: Calendar },
    { title: "Search", icon: Search },
    { title: "Settings", icon: Settings },
  ];

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-4">Application Sidebar</h3>
      <SidebarProvider>
        <div className="flex h-[400px] w-full max-w-xs border rounded-lg overflow-hidden">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </div>
      </SidebarProvider>
    </div>
  );
}
