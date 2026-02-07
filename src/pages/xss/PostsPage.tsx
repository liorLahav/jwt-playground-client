import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Heart, MessageCircle, Share2, Loader2 } from "lucide-react";
import { fetchPosts } from "@/api/posts";
import { useQuery } from "@tanstack/react-query";

export const PostsPage = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] relative overflow-x-hidden font-sans text-slate-900">
      {/* --- Same 'Tasty' Background Blobs as AddPostPage --- */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="fixed -bottom-20 left-20 w-[50%] h-[50%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* --- Main Content Container --- */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
              Latest Stories
            </h1>
            <p className="text-slate-500 text-lg">
              Discover what's happening in the community.
            </p>
          </div>

          <Link to="/add-post">
            <Button className="cursor-pointer bg-slate-900 hover:bg-black text-white rounded-full px-6 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <Plus className="w-5 h-5 mr-2" /> New Post
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : (
          /* Posts Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts?.map((post) => (
              <div className="group bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-400"></div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">
                      Anonymous User
                    </h3>
                    <p className="text-xs text-slate-400">Just now</p>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                {/* !!! VULNERABILITY ZONE !!! 
                           This is where the XSS happens. 
                           The content is rendered as raw HTML.
                        */}
                <div
                  className="text-slate-600 leading-relaxed font-serif text-lg mb-8 line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Card Footer / Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100/50">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-pink-500 transition-colors text-sm font-medium">
                      <Heart className="w-4 h-4" /> 24
                    </button>
                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-blue-500 transition-colors text-sm font-medium">
                      <MessageCircle className="w-4 h-4" /> 5
                    </button>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && posts?.length === 0 && (
          <div className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg">
              No stories yet. Be the first to write one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
