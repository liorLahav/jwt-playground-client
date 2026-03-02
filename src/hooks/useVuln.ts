import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchBacVulnState,
  fetchKidVulnState,
  toggleBacVuln,
  toggleKidVuln,
} from "@/api/auth";

export const useVuln = () => {
  const queryClient = useQueryClient();

  // Queries
  const { data: kidVuln } = useQuery({
    queryKey: ["kidVuln"],
    queryFn: fetchKidVulnState,
  });

  const { data: bacVuln } = useQuery({
    queryKey: ["bacVuln"],
    queryFn: fetchBacVulnState,
  });

  // Mutations
  const { mutateAsync: toggleKid, isPending: isTogglingKid } = useMutation({
    mutationFn: toggleKidVuln,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["kidVuln"] }),
  });

  const { mutateAsync: toggleBac, isPending: isTogglingBac } = useMutation({
    mutationFn: toggleBacVuln,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["bacVuln"] }),
  });

  return {
    kidVuln,
    bacVuln,
    toggleKid,
    toggleBac,
    isTogglingKid,
    isTogglingBac,
  };
};