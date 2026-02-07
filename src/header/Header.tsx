import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.clear();
    navigate("/login");
  };
  return (
    <header className="w-full flex py-6 bg-white/80 backdrop-blur-md border-b border-border shadow-sm sticky top-0 z-50">
      <div className=" w-full px-4 sm:px-6 lg:px-8 flex flex-row justify-between">
        <button className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
          JWT Playground
        </button>
        <Button
          onClick={handleLogout}
          className="text-sm text-white hover:text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 cursor-pointer"
        >
          LogOut
        </Button>
      </div>
    </header>
  );
};
