import { z } from "zod";





export interface RegisterFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}


// types.ts
export interface LoginFormValues {
  email: string;
  password: string;
}


// schema.ts

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});




export interface PostPayloadType{
  content:string , 
  image?:string,
  user_id:string
}


export interface CustomUser {
  user_metadata: {
    avatar_url: string;
    full_name: string;
  };
  id: string;
}




// types/index.ts

export interface Comment {
  id: number;
  user_id: number; // ID of the user who made the comment
  post_id: number; // ID of the post to which this comment belongs
  content: string;
  created_at: string; // ISO date string
}

// types.ts
export interface User {
  id: string;
  name: string;
  username: string;
  profile_image: string | null; // Make sure this matches the actual data structure
}

export interface Post {
  id: number;
  image: string;
  content: string;
  reply_count: number;
  likes_count: number;
  created_at: string;
  users: User; // Update this to a single User object instead of an array
}


export interface PostType  {
  post_id: number;
  user_id: string;
  content: string;
  image?: string;
  name: string;
  username: string;
  email: string;
  profile_image?: string;
  likes_count: number;
  reply_count: number;
  created_at: string;
  liked: boolean;
};