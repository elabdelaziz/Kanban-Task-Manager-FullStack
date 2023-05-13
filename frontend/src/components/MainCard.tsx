import { TasksEntity } from "@/reducers/dataSlice";
import type { DraggableProvided } from "@hello-pangea/dnd";
import { Dispatch, SetStateAction, useState } from "react";

type CardProps = {
  task: TasksEntity;
  taskIndex: number;
  colIndex: number;
  provided: DraggableProvided;
  setRenderTaskModal: Dispatch<SetStateAction<TasksEntity | null>>;
};

const MainCard = ({
  task,
  taskIndex,
  colIndex,
  provided,
  setRenderTaskModal,
}: CardProps) => {
  const count = task.subtasks.filter(
    (item) => item.isCompleted === true
  ).length;
  function handleOnDrag(e: React.DragEvent, widgetType: string) {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  }

  return (
    <>
      <div
        onClick={() => setRenderTaskModal(task)}
        draggable
        // onDragStart={(e) => handleOnDrag(e, "widget B")}
        className="flex flex-col last:mb-[8rem] text-left w-full max-w-[17.5rem] min-h-[5.5rem] [&_p]:word-break p-[1.5rem_1rem] rounded-[8px] shadow-[0_4px_6px_#364e7e1a] mb-[1.5rem] bg-white dark:bg-mainDark min-h-[5.5rem] transition-[filter_.2s_ease] cursor-grab"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {<p className="font-[700] text-[.9375rem]">{task.title}</p>}
        <p className="font-[700] text-[.75rem] text-[#828fa3]">
          {count} of {task.subtasks.length}
        </p>
      </div>
    </>
  );
};

export default MainCard;
