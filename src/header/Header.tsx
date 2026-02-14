import { logOut } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { UseAuth } from "@/routes/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Shield } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = UseAuth();

  useEffect(() => {
    if(user){
      console.log("Rec", isAuthenticated, "and", user)
    }
  }, [user])

  const { mutateAsync: logOutHandler } = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.setQueryData(["auth"], null);
      navigate("/login", { replace: true });
    },
  });

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
    } else {
      logOutHandler();
    }

    queryClient.setQueryData(["auth"], null);

    navigate("/login", { replace: true });
  };
  return (
    <header className="w-full flex py-6 bg-white/80 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-50">
      <div className=" w-full bg-re-px-4 sm:px-6 lg:px-8 flex flex-row justify-between">
        <button className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
          JWT Playground
        </button>
        {user?.role === "admin" && (
          <Button
            onClick={() => navigate("/admin")}
            className="text-sm text-white hover:text-gray-900 bg-gradient-to-r from-green-600 to-teal-500 cursor-pointer"
          >
            <Shield />
            Admin Panel
          </Button>
        )}
      </div>
      <div className="mr-4">
        {user && (
          <Button
            onClick={handleLogout}
            className="text-sm text-white hover:text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 cursor-pointer"
          >
            LogOut
          </Button>
        )}
      </div>
    </header>
  );
};
