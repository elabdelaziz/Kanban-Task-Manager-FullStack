import { useTypedDispatch } from "@/hooks/useRedux";
import { addNewColumn, BoardsEntity, TasksEntity } from "@/reducers/dataSlice";
import { Dispatch, SetStateAction, useState } from "react";

type EditBoardProps = {
  setShowTaskModal: Dispatch<SetStateAction<boolean>>;
  setShowDeleteTask: Dispatch<SetStateAction<boolean>>;
  task: TasksEntity | null;
  activeBoard: BoardsEntity | null;
};

const TaskModal = ({
  setShowTaskModal,
  setShowDeleteTask,
  task,
  activeBoard,
}: EditBoardProps) => {
  console.log(activeBoard);
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleDelete = () => {
    setShowTaskModal(false);
    setShowDeleteTask(true);
  };

  console.log(task);
  return (
    <>
      <div
        onClick={() => setShowTaskModal(false)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <div className="absolute flex items-center justify-center w-[100vw] h-[100vh]">
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-white dark:bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <div className="flex items-start justify-between">
            <h2 className="font-[700] text-[18px] max-w-[380px]">
              {task?.title}
            </h2>
            <div className="w-fit relative h-[20px]">
              <img
                onClick={() => setEditMode(!editMode)}
                className=""
                src="/assets/icon-vertical-ellipsis.svg"
              />
              {editMode && (
                <div className="absolute bg-white shadow-xl border-[1px] border-solid border-inputBorder [&>button]:w-full [&>button]:text-left top-[-15px] min-w-[10rem] right-[30px] whitespace-nowrap flex flex-col items-start rounded-[10px] p-[1rem] dark:bg-mainDark w-fit h-fit">
                  <button onClick={() => {}} className="mb-[10px]">
                    Edit Task
                  </button>
                  <button onClick={handleDelete} className="text-[#ea5555]">
                    Delete Task
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-[#828fa3] mb-[1rem] text-[.8125rem] leading-[23px]">
            {task?.description}
          </p>
          <p className="text-[0.8rem] font-[500] opacity-[0.7] mb-[0.5rem]">
            Subtasks
          </p>
          {task?.subtasks.map((sub, i) => (
            <label
              key={i}
              className={`${
                sub.isCompleted && "line-through"
              } flex items-center p-[0.75rem] rounded-[8px] mb-[0.5rem] text-[.75rem] font-[700] cursor-pointer transition-[all_.2s_ease] bg-bgWhite dark:bg-bgDark`}
            >
              <input
                checked={sub.isCompleted}
                className={`before:content-[''] accent-buttonsMain before:scale-1 before:transform before:transition-[.12s_transform_ease-in-out] cursor-pointer grid mr-[1rem] min-w-[1rem] h-[1rem] rounded-[2px]`}
                type="checkbox"
              />
              {sub.title}
            </label>
          ))}
          <div className="flex flex-col mt-[1rem] relative">
            <p className="text-[0.8rem] opacity-[0.7] font-[500] mb-[0.5rem]">
              Current Status
            </p>
            <div
              id="myDropdown"
              onClick={() => setIsDropOpen(!isDropOpen)}
              className="flex items-center w-[100%] font-[500] justify-between text-[.8125rem] p-[0.5rem_1rem] bg-transparent rounded-[4px] border-[2px] border-solid border-inputBorder capitalize transition-[border_.2s_ease]"
            >
              <span>todo</span>
              <img
                className="w-[10px] h-[7px]"
                src="/assets/icon-chevron-down.svg"
              />
            </div>
            {isDropOpen && (
              <div className="flex absolute top-[80px] items-start [&>*]:opacity-[0.6] [&>*]:font-[400] [&>*]:mb-[1rem] last:[&>*]:mb-0 text-[0.9rem] flex-col w-[100%] h-fit rounded-[4px] p-[1rem] bg-bgWhite dark:bg-bgDark animation-[fadeIn_.2s_ease-in-out] whitespace-nowrap text-ellipsis overflow-hidden border-[1px] border-solid border-mainDark shadow-[0_0_8px_#364e7e1a]">
                {activeBoard?.columns.map((col, i) => (
                  <button
                    className="w-full text-left"
                    key={i}
                    // onClick={() => handleSetCurrentStatus(col.name)}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default TaskModal;
