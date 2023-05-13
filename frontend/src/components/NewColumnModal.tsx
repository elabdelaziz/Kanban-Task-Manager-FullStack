import { useTypedDispatch } from "@/hooks/useRedux";
import { addNewColumn } from "@/reducers/dataSlice";
import { Dispatch, SetStateAction, useState } from "react";

type EditBoardProps = {
  setShowNewColumnModal: Dispatch<SetStateAction<boolean>>;
};

const NewColumnModal = ({ setShowNewColumnModal }: EditBoardProps) => {
  const [value, setValue] = useState("");
  const dispatch = useTypedDispatch();

  return (
    <>
      <div
        onClick={() => setShowNewColumnModal(false)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <div className="absolute flex items-center justify-center w-[100vw] h-[100vh]">
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-white dark:bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <div className="flex flex-col">
            <div className="flex flex-col mb-[1rem]">
              <label className="mb-[0.5rem]" htmlFor="editname">
                Name
              </label>
              <input
                placeholder="Ex. Platform Launch"
                className="bg-transparent text-[0.8125rem] p-[0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
                id="editname"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <button
              onClick={() => dispatch(addNewColumn({ title: value }))}
              className="mt-[1rem] text-white rounded-[20px] bg-mainText text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewColumnModal;
