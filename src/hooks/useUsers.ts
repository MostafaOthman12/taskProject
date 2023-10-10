import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import User from "../entities/User";

export const apiClient = new APIClient<User[]>("/User/GetUsers");

const useUsers = () =>
  useQuery<User[]>(["Users"], {
    queryFn: () => apiClient.getAll(),
  });

export default useUsers;
