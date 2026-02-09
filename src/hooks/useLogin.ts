import { login } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";


export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: login
  });

  return {
    loginUser: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
