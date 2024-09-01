import MainLayout from "@/components/MainLayout";
import PostMainPage from "@/components/post/PostMainPage";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <MainLayout>
      <PostMainPage />
    </MainLayout>
  );
}
