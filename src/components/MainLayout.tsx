import { createClient } from "@/lib/supabase/supabaseServer";
import { redirect } from "next/navigation";
import React from "react";
import TopNav from "./common/TopNav";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth");
  }

  return (
    <div className=" container">
      <TopNav user={data.user} />

      {children}
    </div>
  );
};

export default MainLayout;
