import { fetchUser } from "@/api/auth";
import {useQuery} from "@tanstack/react-query"

export const UseAuth = () => {
  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: fetchUser,
    
  });

  console.log("isAuthenticated", isAuthenticated);

  return { isAuthenticated: !!isAuthenticated, isLoading };
};