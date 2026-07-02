"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  UserIcon,
  SettingsIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react";
import { useAuth } from "@/features/auth/components/auth-context";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { LogoutDialog } from "./logout-dialog";

export function NavUser() {
  const { user, isLoading, refetch } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false)

  const userData = {
    name: user?.name,
    email: user?.email,
    avatar: user?.image,
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isLoading ? (
            <Skeleton className="size-8 rounded-full" />
          ) : (
            <Avatar className="size-8">
              <AvatarImage src={userData.avatar ?? undefined} />
              <AvatarFallback>{userData.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuItem className="flex items-center justify-start gap-2">
            <DropdownMenuLabel className="flex items-center gap-3 overflow-hidden">
              {isLoading ? (
                <Skeleton className="size-10 rounded-full" />
              ) : (
                <Avatar className="size-10">
                  <AvatarImage src={userData.avatar ?? undefined} />
                  <AvatarFallback>{userData.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              {isLoading ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-12 h-2" />
                  <Skeleton className="w-18 h-2" />
                </div>
              ) : (
                <div className="min-w-0 flex-1">
                  <span className="font-medium text-foreground">
                    {userData.name}
                  </span>{" "}
                  <br />
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground text-xs">
                    {userData.email}
                  </div>
                </div>
              )}
            </DropdownMenuLabel>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserIcon />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon />
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <CreditCardIcon />
              Plan & Billing
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="w-full cursor-pointer"
              variant="destructive"
              onClick={() => setDialogOpen(true)}
            >
              <LogOutIcon />
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutDialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)} />
    </div>
  );
}
