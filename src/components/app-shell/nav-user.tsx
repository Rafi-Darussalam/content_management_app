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
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useEffect } from "react";

export function NavUser() {
  const {user, isLoading, refetch} = useAuth();

  const userData = {
    name: user?.name,
    email: user?.email,
    avatar: user?.image,
  };

  useEffect(() => {
    refetch()
  }, [])

  const { logout, error } = useLogout(); 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-8">
          <AvatarImage src={userData.avatar ?? undefined} />
          <AvatarFallback>{userData.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem className="flex items-center justify-start gap-2">
          <DropdownMenuLabel className="flex items-center gap-3 overflow-hidden">
            <Avatar className="size-10">
              <AvatarImage src={userData.avatar ?? undefined} />
              <AvatarFallback>{userData.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <span className="font-medium text-foreground">{userData.name}</span>{" "}
              <br />
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground text-xs">
                {userData.email}
              </div>
            </div>
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
            onClick={logout}
          >
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
