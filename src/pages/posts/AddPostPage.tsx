import { addPost } from "@/api/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import type { Post } from "@/types/posts";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

export const AddPostPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Post>();

  const { mutateAsync: createPost } = useMutation({
    mutationFn: addPost,
    onSuccess: () => navigate("/"),
  });

  const onSubmit: SubmitHandler<Post> = async (data) => {
    await createPost(data);
  };

  return (
    // "Tasty" Background: A subtle, modern gradient mesh
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#f8fafc] overflow-hidden relative">
      {/* Decorative Blobs for "Taste" */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-[40%] h-[40%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* The Main Card */}
      <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white/50">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            New Entry
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
          {/* Title Input - Big & Bold */}
          <div className="space-y-2">
            <Input
              {...register("title", { required: true })}
              placeholder="Enter your title here..."
              required
              className="text-3xl font-bold border-none shadow-none px-0 py-2 h-auto placeholder:text-gray-300 focus-visible:ring-0 bg-transparent text-gray-800"
              autoFocus
            />
          </div>
          <div className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50" />

          {/* Content Input - Clean & Spacious */}
          <div className="space-y-4">
            <Textarea
              {...register("content", { required: true })}
              required
              placeholder='Write your story here...'
              className="min-h-[250px] w-full resize-none border-none shadow-none px-0 text-lg leading-relaxed text-gray-600 placeholder:text-gray-300 focus-visible:ring-0 bg-transparent font-serif"
            />
          </div>

          {/* Footer / Actions */}
          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gray-900 hover:bg-black text-white px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {isSubmitting ? (
                "Publishing..."
              ) : (
                <span className="flex items-center gap-2">
                  Publish <Send className="w-3 h-3" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
