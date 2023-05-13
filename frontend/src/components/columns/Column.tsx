import MainCard from "../MainCard";
import {
  BoardsEntity,
  ColumnsEntity,
  dragAndDrop,
  TasksEntity,
} from "@/reducers/dataSlice";
import { useTypedDispatch } from "../../hooks/useRedux";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Dispatch, SetStateAction, useState } from "react";

type TodoTypes = {
  column: ColumnsEntity;
  index: number;
  data: BoardsEntity[];
  setRenderTaskModal: Dispatch<SetStateAction<TasksEntity | null>>;
};

const TodoColumn = ({ column, index, data, setRenderTaskModal }: TodoTypes) => {
  // const dispatch = useTypedDispatch();

  // function handleOnDrop(e: React.DragEvent) {
  //   const { prevColIndex, taskIndex } = JSON.parse(
  //     e.dataTransfer.getData("text")
  //   );
  //   dispatch(dragAndDrop({ colIndex: index, prevColIndex, taskIndex }));
  // }

  // function handleDragOver(e: React.DragEvent) {
  //   e.preventDefault();
  // }

  const colors = [
    "bg-yellow-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-gray-500",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="flex mr-[2rem] h-[100%] min-h-[calc(100%+8rem)] w-[17.5rem] flex-col">
      <>
        <div className="flex items-center w-[17.5rem] text-[#828fa3] mb-[1.5rem] leading-[2.4px] font-[500] uppercase">
          <span
            className={`${
              index === 0
                ? "bg-[#49C4E5]"
                : index === 1
                ? "bg-[#8471F2]"
                : index === 2
                ? "bg-[#67E2AE]"
                : randomColor
            } flex w-[15px] h-[15px] rounded-full mr-[12px]`}
          ></span>
          {column.name}
        </div>
        <Droppable droppableId={index.toString()}>
          {(droppableProvided, droppableSnapshot) => (
            <div
              className={`${
                column?.tasks.length === 0 &&
                "outline-[2px] outline-dashed outline-[rgba(130,143,163,.4)] rounded-[6px]"
              } min-h-[calc(100vh+2rem)]`}
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {column?.tasks &&
                column.tasks.map((task, taskIndex) => (
                  <Draggable
                    key={taskIndex}
                    draggableId={task?.id?.toString() || taskIndex.toString()}
                    index={taskIndex}
                  >
                    {(draggableProvided, draggableSnapshot) => (
                      <MainCard
                        key={taskIndex}
                        task={task}
                        taskIndex={taskIndex}
                        colIndex={index}
                        provided={draggableProvided}
                        setRenderTaskModal={setRenderTaskModal}
                      />
                    )}
                  </Draggable>
                ))}
            </div>
          )}
        </Droppable>
      </>
    </div>
  );
};

export default TodoColumn;
