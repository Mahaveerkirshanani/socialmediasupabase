"use client";
import { LogOut, Moon, Settings, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useTheme } from "next-themes";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const DropDownSetting = ({ children }: { children: React.ReactNode }) => {
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const supabase = createClient();
  const router = useRouter();

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/auth");
    toast.success("Logout successfully done");
    setLoading(false);
  };

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure to Logout ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will logout from your device and you have to login
              again to access this page
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction  onClick={logout} className=" bg-red-600">
              {loading ? (
                <div className="flex gap-4 items-center">
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  <p>Loading</p>
                </div>
              ) : (
                "Yes Logout"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger className=" cursor-pointer" asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-12">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className={` ${
                theme == "light" ? " text-primary font-bold" : ""
              }`}
            >
              <Sun className="mr-2 h-4 w-4" />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className={` ${theme == "dark" ? " text-primary font-bold" : ""}`}
            >
              <Moon className="mr-2 h-4 w-4" />
              <span>Dark</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className={` ${
                theme == "system" ? " text-primary font-bold" : ""
              }`}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropDownSetting;
