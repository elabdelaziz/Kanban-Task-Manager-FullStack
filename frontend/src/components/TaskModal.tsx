import { useTypedDispatch } from "@/hooks/useRedux";
import { addNewColumn, BoardsEntity, TasksEntity } from "@/reducers/dataSlice";
import { Dispatch, SetStateAction, useState } from "react";

type EditBoardProps = {
  setShowTaskModal: Dispatch<SetStateAction<TasksEntity | null>>;
  task: TasksEntity | null;
  activeBoard: BoardsEntity | null;
};

const TaskModal = ({ setShowTaskModal, task, activeBoard }: EditBoardProps) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowTaskModal(null)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <div className="absolute flex items-center justify-center w-[100vw] h-[100vh]">
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-white dark:bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <div className="flex items-start justify-between">
            <h2 className="font-[700] text-[18px] max-w-[380px]">
              {task?.title}
            </h2>
            <img
              className="w-fit h-[20px]"
              src="/assets/icon-vertical-ellipsis.svg"
            />
          </div>
          <p className="text-[#828fa3] mb-[1rem] text-[.8125rem] leading-[23px]">
            {task?.description}
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
            <div
              id="myDropdown"
              onClick={() => setIsDropOpen(!isDropOpen)}
              className="flex items-center w-[100%] font-[500] justify-between text-[.8125rem] p-[1rem_1rem] bg-transparent rounded-[4px] border-[2px] border-solid border-inputBorder capitalize transition-[border_.2s_ease]"
            >
              {/* <span>{status}</span> */}
              <img
                className="w-[10px] h-[7px]"
                src="/assets/icon-chevron-down.svg"
              />
            </div>
            {isDropOpen && (
              <div className="flex absolute top-[64px] items-start [&>*]:opacity-[0.6] [&>*]:font-[400] [&>*]:mb-[1rem] last:[&>*]:mb-0 text-[0.9rem] flex-col w-[100%] h-fit rounded-[4px] p-[1rem] bg-bgWhite dark:bg-bgDark animation-[fadeIn_.2s_ease-in-out] whitespace-nowrap text-ellipsis overflow-hidden border-[1px] border-solid border-mainDark shadow-[0_0_8px_#364e7e1a]">
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
