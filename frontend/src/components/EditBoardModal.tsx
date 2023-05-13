import { BoardsEntity, ColumnsEntity, editBoard } from "@/reducers/dataSlice";
import { nanoid } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useTypedDispatch } from "@/hooks/useRedux";

type EditBoardProps = {
  setShowEditBoard: Dispatch<SetStateAction<boolean>>;
  activeBoard: BoardsEntity | null;
};

const EditBoardModal = ({ setShowEditBoard, activeBoard }: EditBoardProps) => {
  const dispatch = useTypedDispatch();

  const {
    register,
    watch,
    // clearErrors,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<BoardsEntity>({
    defaultValues: {
      name: activeBoard?.name,
      columns: activeBoard?.columns?.map((item: ColumnsEntity) => ({
        id: item.id,
        name: item.name,
        tasks: item.tasks,
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const handleAddNewColumn = () => {
    if (fields.length > 4) return;
    append({ id: activeBoard!.columns.length + 1, name: "", tasks: [] });
  };

  const watchFieldArray = watch("columns");

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray?.[index],
    };
  });

  const onSubmit = (data: any) => {
    dispatch(editBoard(data));
  };

  return (
    <>
      <div
        onClick={() => setShowEditBoard(false)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute flex items-center justify-center w-[100vw] h-[100vh]"
      >
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-white dark:bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <div className="flex flex-col">
            <div className="flex flex-col mb-[1rem]">
              <label className="mb-[0.5rem]" htmlFor="editname">
                Name
              </label>
              <input
                defaultValue={activeBoard?.name}
                placeholder="Platform Launch"
                className="bg-transparent text-[0.8125rem] p-[0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
                id="editname"
                type="text"
                {...register("name", {
                  // validate: (value) => isDuplicatedName(value),
                  required: true,
                })}
              />
            </div>
            <label htmlFor="subtasks">Columns</label>
            {controlledFields.map((col, i) => (
              <div key={i} className="flex items-center mb-[1rem]">
                <input
                  placeholder="Todo"
                  className="bg-transparent flex-1 text-[0.8125rem] p-[0.5rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
                  id="subtasks"
                  defaultValue={col.name}
                  {...register(`columns.${i}.name`, {
                    // validate: (value) => isDuplicatedName(value),
                    required: true,
                  })}
                />
                <button className="ml-[1rem] text-[22px] opacity-[0.5]">
                  x
                </button>
              </div>
            ))}
            {/* <div className="flex items-center mb-[1rem]">
              <input
                placeholder="Doing"
                className="bg-transparent flex-1 text-[0.8125rem] p-[0.5rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
                id="subtasks"
              />
              <button className="ml-[1rem] text-[22px] opacity-[0.5]">x</button>
            </div>
            <div className="flex items-center mb-[1rem]">
              <input
                placeholder="Done"
                className="bg-transparent flex-1 text-[0.8125rem] p-[0.5rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
                id="subtasks"
              />
              <button className="ml-[1rem] text-[22px] opacity-[0.5]">x</button>
            </div> */}
            <button
              onClick={handleAddNewColumn}
              className="mt-[1rem] rounded-[20px] text-mainText bg-[#f0effa] dark:bg-white text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]"
            >
              + Add New Column
            </button>
            <button
              type="submit"
              className="mt-[1rem] rounded-[20px] text-white bg-mainText text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default EditBoardModal;
