"use client";

import { cn } from "@/lib/utils";
import { LogoIcon } from "@/components/app-shell/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { footerNavLinks, navGroups } from "@/components/app-shell/app-shared";
import { NavGroup } from "@/components/app-shell/nav-group";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CreateWorkSpace } from "@/features/workspaces/components/create-workspace";

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar
      className={cn(
        "*:data-[slot=sidebar-inner]:bg-background",
        "*:data-[slot=sidebar-inner]:dark:bg-[radial-gradient(60%_18%_at_10%_0%,--theme(--color-foreground/.08),transparent)]",
        "**:data-[slot=sidebar-menu-button]:[&>span]:text-foreground/75",
      )}
      collapsible="icon"
      variant="sidebar"
    >
      <SidebarHeader className="h-14 justify-center border-b px-2">
        <SidebarMenuButton asChild>
          <a href="#link">
            <LogoIcon />
            <span className="font-medium text-foreground!">Efferd</span>
          </a>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="pb-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <CreateWorkSpace />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {navGroups.map((group, index) => (
          <NavGroup key={`sidebar-group-${index}`} {...group} />
        ))}
      </SidebarContent>
      <SidebarFooter className="gap-0 p-0">
        <SidebarMenu className="border-t p-2">
          {footerNavLinks.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="text-muted-foreground"
                isActive={pathname === item.path}
                size="sm"
              >
                <Link href={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="px-4 pt-4 pb-2 transition-opacity group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0">
          <p className="text-nowrap text-[9px] text-muted-foreground">
            © {new Date().getFullYear()} Efferd LLC
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
