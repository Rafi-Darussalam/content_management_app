import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { SidebarNavGroup } from "@/components/app-shell/app-shared";
import { ChevronRightIcon } from "lucide-react";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "../ui/tooltip";
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CreateWorkSpace } from "@/features/workspaces/components/create-workspace";

export function NavGroup({ label, items }: SidebarNavGroup) {
  const { open } = useSidebar();
  const pathname = usePathname()
  
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            asChild
            className="group/collapsible"
            defaultOpen={
              !!item.isActive || item.subItems?.some((i) => !!i.isActive)
            }
            key={item.title}
          >
            <SidebarMenuItem>
              {item.subItems?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton isActive={item.isActive}>
                      {item.icon}
                      <span>{item.title}</span>
                      <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItems?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <Tooltip>
                            <TooltipTrigger>
                              <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subItem.path || pathname.startsWith(subItem.path)}
                              >
                                <Link href={subItem.path}>
                                  {subItem.icon}
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </TooltipTrigger>
                            <TooltipContent side="right" className={`${open && "opacity-0"}`}>
                              <p>{item.title}</p>
                            </TooltipContent>
                          </Tooltip>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : (
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <SidebarMenuButton asChild isActive={pathname === item.path || pathname.startsWith(item.path)}>
                      <Link href={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right" className={`${open && "opacity-0"}`}>
                    <p>{item.title}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
