import { useQuery } from "@tanstack/react-query";
import User from "../entities/User";
import APIClient from "../services/api-client";
import { FieldValues } from "react-hook-form";

const useLogin = (user: FieldValues | null) => {
  const apiClient = new APIClient<User>(
    `/User/Login/${user?.userName}/${user?.password}`
  );
  return useQuery<User>(["LogedUser"], {
    queryFn: () => apiClient.getAll(),
  });
};
export default useLogin;
