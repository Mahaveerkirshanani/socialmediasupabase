import React from "react";
import {
  Heart,
  Share,
  Bookmark,
  MoreVertical,
  MessageCircle,
  Send,
} from "lucide-react";
import moment from "moment";
import { Post } from "../../../types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getS3Url } from "@/lib/helper";
import LikePost from "./LikePost";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Avatar>
            <AvatarImage src={getS3Url(post.users?.profile_image!)} />
            <AvatarFallback className="capitalize">
              {post.users.name[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="font-semibold text-gray-800 dark:text-gray-200 capitalize">
              {post.users.username}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {moment(post.created_at).fromNow()}
            </p>
          </div>
        </div>
        <MoreVertical
          size={24}
          className="text-gray-600 dark:text-gray-400 cursor-pointer"
        />
      </div>

      <p className="mt-2 text-gray-700 dark:text-gray-300">{post.content}</p>

      {post.image && (
        <img
          src={getS3Url(post.image)}
          alt="Post Image"
          className="w-full max-h-[50vh] md:max-h-[70vh] h-full object-cover rounded-lg mt-2"
        />
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-4">
        <LikePost postId={post.id} userId={post.users.id} />
          <MessageCircle
            size={24}
            className="text-gray-600 dark:text-gray-400 cursor-pointer"
          />
          <Send
            size={24}
            className="text-gray-600 dark:text-gray-400 cursor-pointer"
          />
        </div>
        <Bookmark
          size={24}
          className="text-gray-600 dark:text-gray-400 cursor-pointer"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {post.likes_count} likes
        </p>
       
      </div>
    </div>
  );
};

export default PostCard;
