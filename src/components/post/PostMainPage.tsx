"use client"; // Ensures the component runs on the client-side

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { createClient } from "@/lib/supabase/supabaseClient";
import { Loader } from "lucide-react";

const PostMainPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("posts")
        .select(
          "id, image, content, reply_count, likes_count, created_at, users(id, name, username, profile_image)"
        )
        .order("created_at", { ascending: false }); // Order by `created_at` in descending order

      if (error) {
        setError("Failed to fetch posts, please refresh.");
        console.error("Error fetching posts:", error.message);
      } else {
        setPosts(data || []);
      }
    };

    fetchPosts();

    // Set up real-time subscriptions to get updates without refresh
    const supabase = createClient();
    const subscription = supabase
      .channel('public:posts')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        (payload) => {
          console.log('Change received!', payload);
          fetchPosts(); // Refetch posts on changes
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe(); // Clean up subscription on component unmount
    };
  }, []);

  if (error) {
    return (
      <div className="font-semibold text-lg text-red-500 tracking-wider">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-4">
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              //@ts-ignore
              post={post}
            />
          ))}
        </div>
      ) : (
        <div className=" w-full h-[80vh] flex items-center justify-center ">
         <Loader size={60} className=" animate-spin"  />
        </div>
      )}
    </div>
  );
};

export default PostMainPage;
