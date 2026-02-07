import { login } from "@/api/auth";
import type { LoginInputs } from "@/login/Login";
import { useMutation } from "@tanstack/react-query";


export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: ({ username, password, storedLocation }: LoginInputs) =>
      login(username, password, storedLocation),
  });

  return {
    loginUser: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};
