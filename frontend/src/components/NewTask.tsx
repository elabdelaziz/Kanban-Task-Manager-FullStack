import { useState, Dispatch, SetStateAction } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { BoardsEntity, TasksEntity, addTask } from "@/reducers/dataSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useTypedDispatch } from "@/hooks/useRedux";

type NewTaskTypes = {
  setNewTaskMode: Dispatch<SetStateAction<boolean>>;
  activeBoard: BoardsEntity | null;
};

const NewTaskModal = ({ setNewTaskMode, activeBoard }: NewTaskTypes) => {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const dispatch = useTypedDispatch();

  const {
    register,
    watch,
    setValue,
    getValues,
    // clearErrors,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TasksEntity>({
    defaultValues: {
      id: nanoid(),
      title: "",
      description: "",
      subtasks: [{ title: "", isCompleted: false }],
      status: activeBoard?.columns[0].name,
    },
  });

  const status = getValues().status;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const onSetCurrentStatus = (value: string) => {
    setValue("status", value, { shouldValidate: true });
  };

  const handleSetCurrentStatus = (status: string) => {
    onSetCurrentStatus(status);
    setIsDropOpen(false);
  };

  const onSubmit: SubmitHandler<TasksEntity> = (data) => {
    dispatch(addTask({ task: data }));
    // dispatch(closeModal());
  };

  const handleAddNewSubtask = () => {
    if (fields.length > 6) return;
    append({ title: "New Subtask", isCompleted: false });
  };

  return (
    <>
      <div
        onClick={() => setNewTaskMode(false)}
        className="absolute z-[3] overlay w-[100vw] h-[100vh] bg-black bg-opacity-[0.5]"
      ></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="absolute flex items-center justify-center w-[100vw] h-[100vh]"
      >
        <div className="rounded-[10px] z-[4] flex flex-col [&>div]:mb-[1rem] [&>div>label]:mb-[0.5rem] p-[2rem] bg-white dark:bg-mainDark w-[100%] max-w-[30rem] max-h-[60rem] h-[fit]">
          <div className="flex flex-col">
            <label htmlFor="title">title</label>
            <input
              className="bg-transparent text-[0.8125rem] p-[0.7rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
              id="title"
              {...register("title", {
                // validate: (value) => isDuplicatedName(value),
                required: true,
              })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="textarea">Description</label>
            <textarea
              className="bg-transparent text-[.8125rem] p-[0.5rem_1rem] rounded-[4px] border-[2px] border-solid border-inputBorder transition-[border_.2s_ease]"
              id="textarea"
              rows={4}
              spellCheck="false"
              {...register("description", {
                // validate: (value) => isDuplicatedName(value),
                required: true,
              })}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="subtasks">Subtasks</label>
            <div className="flex flex-col items-center mb-[1rem]">
              <>
                {fields.map((item, index) => {
                  return (
                    <>
                      <div className="w-full flex mb-[1rem]">
                        <input
                          className="bg-transparent flex-1 text-[0.8125rem] p-[0.7rem_0.5rem] rounded-[4px] border-[1px] border-solid border-inputBorder transition-[border_.2s_ease]"
                          id="subtasks"
                        />
                        <button
                          type="button"
                          className="ml-[1rem] text-[22px] opacity-[0.5]"
                        >
                          x
                        </button>
                      </div>
                    </>
                  );
                })}
              </>
            </div>
            {fields.length < 4 && (
              <button
                type="button"
                onClick={handleAddNewSubtask}
                className="mt-[0.5rem] rounded-[20px] text-[#635fc7] bg-[#f0effa] dark:bg-white text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]"
              >
                Add New Subtask
              </button>
            )}
          </div>
          <div className="flex flex-col relative">
            <div
              id="myDropdown"
              onClick={() => setIsDropOpen(!isDropOpen)}
              className="flex items-center w-[100%] font-[500] justify-between text-[.8125rem] p-[0.7rem_0.5rem] bg-transparent rounded-[4px] border-[2px] border-solid border-inputBorder capitalize transition-[border_.2s_ease]"
            >
              <span>{status}</span>
              <img
                className="w-[10px] h-[7px]"
                src="/assets/icon-chevron-down.svg"
              />
            </div>
            {isDropOpen && (
              <div className="flex absolute top-[64px] items-start [&>*]:opacity-[0.6] [&>*]:font-[400] [&>*]:mb-[1rem] last:[&>*]:mb-0 text-[0.9rem] flex-col w-[100%] h-fit rounded-[4px] p-[1rem] bg-bgWhite dark:bg-bgDark animation-[fadeIn_.2s_ease-in-out] whitespace-nowrap text-ellipsis overflow-hidden border-[1px] border-solid border-mainDark shadow-[0_0_8px_#364e7e1a]">
                {activeBoard!.columns.map((col, i) => (
                  <button
                    className="w-full text-left"
                    key={i}
                    onClick={() => handleSetCurrentStatus(col.name)}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="mt-[1rem] rounded-[20px] text-white bg-mainText text-[.8125rem] p-[0.5rem_1rem] h-auto font-[700] transition-[all_.2s_ease]"
            >
              Create Task
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewTaskModal;
