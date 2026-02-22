import { deleteUserById, fetchNumOfUsers, fetchUsers } from "@/api/panel";
import { Button } from "@/components/ui/button";
import {type User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Shield, Users, Trash2, Loader2, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Panel = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: numOfUsers, isLoading: isLoadingCount } = useQuery({
    queryKey: ["numOfUsers"],
    queryFn: fetchNumOfUsers,
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const {mutateAsync: deleteUser} = useMutation({
    mutationFn: (userId: string) => deleteUserById(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["users"]});
      queryClient.invalidateQueries({queryKey: ["numOfUsers"]});
    }
  })

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      await deleteUser(userId);
    }
  }

  console.log("Users data:", users);

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] relative overflow-x-hidden font-sans text-slate-900">
      {/* Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate("/")}
            className="group cursor-pointer text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back
          </button>

          <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            Admin Panel
          </div>
        </div>

        {/* Dashboard Stat Card */}
        <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-sm mb-12 w-full sm:w-64">
          <div className="flex items-center gap-3 mb-2 text-slate-500">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Total Users</span>
          </div>
          <p className="text-4xl font-black text-slate-900">
            {isLoadingCount ? "..." : numOfUsers}
          </p>
        </div>

        {/* Users List Container */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Manage Users</h2>

          {/* List Header (Hidden on Mobile) */}
          <div className="hidden md:grid grid-cols-12 px-8 py-2 text-sm font-semibold text-slate-400">
            <div className="col-span-6 text-left">User Details</div>
            <div className="col-span-3">Role</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {/* User Rows */}
          <div className="grid gap-3">
            {users?.map((user) => (
              <div
                key={user._id}
                className="group grid grid-cols-1 md:grid-cols-12 items-center bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl p-4 md:px-8 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
              >
                {/* Username Column */}
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-blue-50 flex items-center justify-center">
                    <UserCircle className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{user.userName}</p>
                    <p className="text-xs text-slate-400 md:hidden">Role: {user.role || 'user'}</p>
                  </div>
                </div>

                {/* Role Column */}
                <div className="hidden md:block col-span-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {user.role || "user"}
                  </span>
                </div>

                {/* Actions Column */}
                <div className="col-span-3 flex justify-end mt-4 md:mt-0">
                  <Button
                    variant="ghost"
                    className="h-10 text-red-500 hover:text-white hover:bg-red-500 rounded-xl px-4 transition-all cursor-pointer"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Delete</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Loading State */}
          {isLoadingUsers && (
            <div className="flex flex-col items-center justify-center py-20 bg-white/30 rounded-3xl border border-dashed border-slate-200">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500 mb-2" />
              <p className="text-slate-500 font-medium">Loading user database...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoadingUsers && users?.length === 0 && (
            <div className="text-center py-20 bg-white/30 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400">No active users found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};