import {useQuery} from "@tanstack/react-query"

export const UseAuth = () => {
  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: () => {
      // Check if token exists in localStorage
      const token = localStorage.getItem('token');
      return !!token; // Return true if token exists
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return { isAuthenticated: !!isAuthenticated, isLoading };
};