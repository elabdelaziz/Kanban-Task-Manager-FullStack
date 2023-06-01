import { Dispatch, SetStateAction } from "react";
import { useTypedDispatch } from "@/hooks/useRedux";
import { BoardsEntity, TasksEntity, deleteBoard } from "@/reducers/dataSlice";
import instance from "@/utils/axiosInstance";
import { AxiosRequestConfig } from "axios";
type DeleteProps = {
  setShowDeleteTask: Dispatch<SetStateAction<boolean>>;
  // setEditMode: Dispatch<SetStateAction<boolean>>;
  activeBoard: BoardsEntity | null;
  task: TasksEntity | null;
};
const DeleteTaskConfirmation = ({
  setShowDeleteTask,
  // setEditMode,
  activeBoard,
  task,
}: DeleteProps) => {
  const dispatch = useTypedDispatch();

  const handleDelete = async () => {
    const id = task?.id;
    console.log("id at client", id);
    console.log("task at client", task);
    try {
      const response = await instance.delete(`/api/tasks/${id}`);
      return response;
    } catch (err) {
      throw new Error("cannot delete task from database", err as ErrorOptions);
    }
  };
  console.log(task);
  return (
    <>
      <div
        onClick={() => setShowDeleteTask(false)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <div className="absolute flex items-center justify-center w-[100vw] h-[100vh]">
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-white dark:bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <h2 className="text-[#ea5555] mb-[1rem] font-[700] text-[18px]">
            Delete This Task?
          </h2>
          <p className="text-[.8125rem] text-[14px] text-[#828fa3] leading-[23px]">
            Are you sure you want to delete &apos;{task?.title}&apos; task? This
            action will remove all subtasks and cannot be reversed.
          </p>
          <div className="flex mt-[1.5rem]">
            <button
              onClick={handleDelete}
              className="button mr-[1rem] bg-[#ea5555]"
            >
              Delete
            </button>
            <button onClick={() => setShowDeleteTask(false)} className="button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteTaskConfirmation;
