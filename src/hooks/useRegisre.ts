import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import User from "../entities/User";

export const apiClient = new APIClient<User>(`/User/Register`);

const useRegister = (data: User) =>
  useMutation({ mutationFn: () => apiClient.post(data) });

export default useRegister;
