import { Heart, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/supabaseClient";

interface PostLikeProps {
  postId: number;
  userId: string;
}

export default function PostLike({ postId, userId }: PostLikeProps) {
  const supabase = createClient();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to check if the current user has liked the post
  const checkIfLiked = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking like status:", error.message);
    } else {
      setIsLiked(!!data); // Use !! to ensure boolean value
    }
    setLoading(false);
  };

  // Function to handle like and unlike actions
  const toggleLike = async () => {
    setLoading(true);

    try {
      if (isLiked) {
        // Unlike the post
        const { error: decrementError } = await supabase.rpc("like_decrement", { row_id: postId, count: 1 });
        if (decrementError) console.error("Error updating like count:", decrementError.message);

        const { error: deleteError } = await supabase
          .from("likes")
          .delete()
          .match({ user_id: userId, post_id: postId });
        if (deleteError) console.error("Error deleting like:", deleteError.message);

        // Remove notification if exists
        const { error: notificationError } = await supabase
          .from("notifications")
          .delete()
          .match({ user_id: userId, post_id: postId, type: 1 });
        if (notificationError) console.error("Error deleting notification:", notificationError.message);

        setIsLiked(false);
      } else {
        // Like the post
        const { error: incrementError } = await supabase.rpc("like_increment", { row_id: postId, count: 1 });
        if (incrementError) console.error("Error updating like count:", incrementError.message);

        const { error: insertError } = await supabase
          .from("likes")
          .insert({ user_id: userId, post_id: postId });
        if (insertError) console.error("Error inserting like:", insertError.message);

        // Add notification
        const { error: addNotificationError } = await supabase.from("notifications").insert({
          post_id: postId,
          user_id: userId,
          to_user_id: userId,
          type: 1,
        });
        if (addNotificationError) console.error("Error adding notification:", addNotificationError.message);

        setIsLiked(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIfLiked();
  }, [postId, userId]);

  return (
    <button
      onClick={() => toggleLike()}
      disabled={loading}
      aria-label={isLiked ? "Unlike post" : "Like post"}
      className="focus:outline-none"
    >
      {loading ? (
        <Loader />
      ) : isLiked ? (
        <svg
          width="26"
          height="26"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-red-500 cursor-pointer"
        >
          <path
            d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        <Heart
          size={24}
          className="text-gray-500 dark:text-gray-400 cursor-pointer"
        />
      )}
    </button>
  );
}
