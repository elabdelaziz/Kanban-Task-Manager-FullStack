import React, { Dispatch, SetStateAction } from "react";
import BoardButton from "./BoardButton";
import ThemeSwitch from "./ThemeSwitch";
import { BoardsEntity } from "@/reducers/dataSlice";

// write types
type BoardsMobileProps = {
  data: BoardsEntity[];
  darkMode: boolean;
  setShowNewBoardModal: (value: boolean) => void;
  toggleDarkMode: () => void;
  setSideBarHidden: Dispatch<SetStateAction<boolean>>;
  setShowBoardsMobile: Dispatch<SetStateAction<boolean>>;
};

export default function BoardsMobile({
  data,
  darkMode,
  toggleDarkMode,
  setShowNewBoardModal,
  setShowBoardsMobile,
}: BoardsMobileProps) {
  return (
    <>
      <div
        onClick={() => setShowBoardsMobile(false)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <div className="absolute flex h-full w-full items-start pt-[6rem] justify-center">
        <div className="rounded-[10px] absolute z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[1rem_0_1rem] bg-white dark:bg-mainDark w-[50%] min-w-[18rem] max-h-[60rem] h-[fit]">
          <div className="flex flex-col">
            <div className="pr-[1rem]">
              <h3 className="pl-[2rem] mb-[1rem]">All Boards {"(3)"}</h3>
              {data &&
                data.map((item, i) => (
                  <BoardButton key={i} boardIndex={i} title={item.name} />
                ))}
              <button
                onClick={() => setShowNewBoardModal(true)}
                className="text-buttonsMain px-[2rem] py-[0.8rem] mt-[10px] font-[500] flex items-center"
              >
                <img className="mr-[1rem]" src="assets/icon-board.svg" />+
                Create New Board
              </button>
            </div>
            <div className="h-[48px] rounded-[6px] mx-[2rem] mt-[1rem] bg-bgWhite dark:bg-bgDark flex items-center justify-around">
              <img
                className="w-[20px] h-[20px]"
                src="/assets/icon-light-theme.svg"
              />
              <ThemeSwitch isDark={darkMode} onToggle={toggleDarkMode} />
              <img
                className="w-[20px] h-[20px]"
                src="/assets/icon-dark-theme.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
