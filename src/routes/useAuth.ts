import { fetchUser } from "@/api/auth";
import type { User } from "@/types/user";
import {useQuery} from "@tanstack/react-query"

export const UseAuth = () => {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ['auth'],
    queryFn: fetchUser,
    
  });

  console.log("fetched user", user)

  return { isAuthenticated: !!user, isLoading, user };
};