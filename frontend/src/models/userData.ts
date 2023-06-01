import instance from "@/utils/axiosInstance";

export type LoginFormInput = {
  email: string;
  password: string;
};
export const loginUser = async (data: LoginFormInput) => {
  const response = await instance.post("/api/users/auth", data);
  return response;
};

export const getUserTasks = async (colId: number) => {
  const response = await instance.get(`/api/tasks/${colId}`);
  return response;
};
