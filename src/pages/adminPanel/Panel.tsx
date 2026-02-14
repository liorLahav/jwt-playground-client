import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Users, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Panel = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] relative overflow-x-hidden font-sans text-slate-900">
      {/* Background Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="fixed -bottom-20 left-20 w-[50%] h-[50%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            Admin Panel
          </div>
        </div>

        {/* Dashboard Cards */}
          <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all mb-12 w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-blue-500" />
              <h3 className="font-bold text-lg">Total Users</h3>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">--</p>
          </div>

        {/* Users Management Table */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">
            Manage Users
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-slate-500 border-b border-slate-200">
                  <th className="pb-3">Username</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3 text-right pr-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* Example Row Placeholder */}
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="py-4 font-medium text-slate-800">
                    exampleUser
                  </td>
                  <td className="py-4 text-slate-500">user</td>
                  <td className="py-4 text-right">
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full px-4"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Empty State Placeholder */}
          <div className="text-center py-12 text-slate-400 text-sm">
            Data will appear here once connected.
          </div>
        </div>
      </div>
    </div>
  );
};
