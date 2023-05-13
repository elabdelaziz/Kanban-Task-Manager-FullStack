import { Dispatch, SetStateAction } from "react";
import { useTypedDispatch } from "@/hooks/useRedux";
import { BoardsEntity, deleteBoard } from "@/reducers/dataSlice";
type DeleteProps = {
  setShowDelete: Dispatch<SetStateAction<boolean>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  activeBoard: BoardsEntity | null;
};
const DeleteBoardConfirmation = ({
  setShowDelete,
  setEditMode,
  activeBoard,
}: DeleteProps) => {
  const dispatch = useTypedDispatch();

  const handleDelete = () => {
    dispatch(deleteBoard(""));
    setShowDelete(false);
    setEditMode(false);
  };
  return (
    <>
      <div
        onClick={() => setShowDelete(false)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <div className="absolute flex items-center justify-center w-[100vw] h-[100vh]">
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-white dark:bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <h2 className="text-[#ea5555] mb-[1rem] font-[700] text-[18px]">
            Delete This Board?
          </h2>
          <p className="text-[.8125rem] text-[14px] text-[#828fa3] leading-[23px]">
            Are you sure you want to delete the &apos;{activeBoard?.name}&apos;
            board? This action will remove all columns and tasks and cannot be
            reversed.
          </p>
          <div className="flex mt-[1.5rem]">
            <button
              onClick={handleDelete}
              className="button mr-[1rem] bg-[#ea5555]"
            >
              Delete
            </button>
            <button onClick={() => setShowDelete(false)} className="button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteBoardConfirmation;
