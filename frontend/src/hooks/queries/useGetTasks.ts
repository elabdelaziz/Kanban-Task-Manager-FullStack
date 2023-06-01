import { useQuery } from "@tanstack/react-query";
import { getUserTasks } from "@/models/userData";

const useGetTasks = (colId: number) => {
  return useQuery(
    ["user-tasks"],
    async () => {
      const data = await getUserTasks(colId);
      console.log(data);
      return data;
    },
    {
      staleTime: 1000 * 60 * 100,
      // ...options,
    }
  );
};
export default useGetTasks;
