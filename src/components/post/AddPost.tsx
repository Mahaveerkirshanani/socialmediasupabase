import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "@supabase/supabase-js";
import { Image, Loader2Icon, PlusSquare, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PostPayloadType } from "../../../types";
import { v4 as uuid } from "uuid";
import { createClient } from "@/lib/supabase/supabaseClient";
import Env from "@/Env";
import { toast } from "react-toastify";

interface AddPostProps {
  user: User;
}

const AddPost: React.FC<AddPostProps> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const supabase = createClient();

  const handleImageIcon = () => {
    imageRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
  
    try {
      const payload: PostPayloadType = {
        content: content,
        user_id: user.id,
      };
  
      if (image) {
        const path = `${user.id}/${uuid()}`;
        const { data, error } = await supabase.storage
          .from(Env.S3_BUCKET)
          .upload(path, image, {
            cacheControl: "3600",
            upsert: false,
          });
  
        if (error) {
          toast.error("Failed to upload image", { theme: "colored" });
          throw new Error("Image upload failed");
        }
  
        payload.image = data.path;
      }
  
      const { data: postData, error: postError } = await supabase.from("posts").insert(payload);
  
      if (postError) {
        toast.error("Failed to create post", { theme: "colored" });
        throw new Error("Post creation failed");
      }
  
      toast.success("Post created successfully!", { theme: "colored" });
   
    } catch (error) {
      console.error("Error during post submission:", error);
    } finally {
      setOpen(false);
      setContent("");
      setImage(null);
      setLoading(false);
    }
  };
  
  const removeImage = () => {
    setImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        <PlusSquare size={30} className="lg:text-gray-500" />
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>
            <Textarea
              placeholder="Add your thoughts"
              className="bg-muted rounded-lg outline-none focus:outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {image && (
              <div className="relative mt-3">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <X
                  size={24}
                  className="absolute top-2 right-2 text-white bg-black rounded-md cursor-pointer"
                  onClick={removeImage}
                />
              </div>
            )}
            <div className="flex items-center justify-between mt-3">
              <Input
                type="file"
                className="hidden"
                ref={imageRef}
                onChange={handleFileChange}
                accept="image/*"
              />
              <Image
                size={30}
                className="cursor-pointer"
                onClick={handleImageIcon}
              />
              <Button size={"sm"} onClick={handleSubmit} disabled={!content}>
                {loading ? (
                  <div className="flex items-center gap-2 ">
                    <Loader2Icon className="animate-spin" />
                    <p>Loading ...</p>
                  </div>
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddPost;
