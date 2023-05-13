import { useTypedDispatch, useTypedSelector } from "@/hooks/useRedux";
import { addNewBoard, BoardsEntity } from "@/reducers/dataSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useState, Dispatch, SetStateAction } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

type BoardProps = {
  setShowNewBoardModal: Dispatch<SetStateAction<boolean>>;
};

const NewBoardModal = ({ setShowNewBoardModal }: BoardProps) => {
  // const data = useTypedSelector((state) => state.data.data);
  let idCount = 0;
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
      name: " ",
      columns: [{ id: 0, name: "", tasks: [] }],
      // id: data.length + 1,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const watchFieldArray = watch("columns");

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray?.[index],
    };
  });

  const handleAddNewColumn = () => {
    if (fields.length > 5) return;
    idCount += 1;
    append({ id: idCount, name: "", tasks: [] });
  };

  const onSubmit: SubmitHandler<BoardsEntity> = (data) => {
    dispatch(addNewBoard({ board: data }));
  };

  return (
    <>
      <div
        onClick={() => setShowNewBoardModal(false)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute flex items-center justify-center w-[100vw] h-[100vh]"
      >
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-white dark:bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              className="bg-transparent text-[0.8125rem] p-[0.7rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
              id="name"
              {...register("name", {
                // validate: (value) => isDuplicatedName(value),
                required: true,
              })}
            />
          </div>
          <div className="flex flex-col">
            <label>Columns</label>
            {controlledFields.map((col, i) => (
              <input
                key={i}
                defaultValue={col.name}
                className="bg-transparent mb-[1rem] text-[0.8125rem] p-[0.7rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
                id="col"
                {...register(`columns.${i}.name`, {
                  // validate: (value) => isDuplicatedName(value),
                  required: true,
                })}
              />
            ))}
          </div>
          <button
            onClick={handleAddNewColumn}
            className="mt-[1rem] rounded-[20px] text-mainText bg-[#f0effa] dark:bg-white text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]"
          >
            + Add New Column
          </button>
          <button
            type="submit"
            className="mt-[1rem] text-white rounded-[20px] bg-mainText text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]"
          >
            Create New Board
          </button>
        </div>
      </form>
    </>
  );
};

export default NewBoardModal;
