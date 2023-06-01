import { Dispatch, SetStateAction } from "react";
import { useTypedDispatch } from "@/hooks/useRedux";
import { ActiveBoard, setActiveColumn } from "@/reducers/dataSlice";
import { useTypedSelector } from "@/hooks/useRedux";
import useLocalStorage from "@/hooks/useLocalStorage";

type BoardProps = {
  title: string;
  boardIndex: number;
  setActiveBoardIndex: Dispatch<SetStateAction<number>>;
};

const BoardButton = ({
  title,
  boardIndex,
  setActiveBoardIndex,
}: BoardProps) => {
  const useSelector = useTypedSelector;
  const dispatch = useTypedDispatch();

  const handleClick = () => {
    dispatch(setActiveColumn(boardIndex));
    setActiveBoardIndex(boardIndex);
  };

  const activeCol = useSelector((state) => state.data.activeColIndex);
  return (
    <button
      onClick={handleClick}
      className={`${
        activeCol === boardIndex
          ? "bg-buttonsMain text-white w-full md:w-[17rem]"
          : "opacity-[0.7] dark:opacity-[1]"
      } flex items-center mb-[0.2rem] px-[2rem] py-[0.8rem] w-[17rem] text-[16px] font-[500] rounded-r-[25px]`}
    >
      <img className="mr-[1rem]" src="assets/icon-board.svg"></img>
      <span>{title}</span>
    </button>
  );
};

export default BoardButton;
