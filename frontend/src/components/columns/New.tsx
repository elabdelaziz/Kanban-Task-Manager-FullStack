import { Dispatch, SetStateAction } from "react";
type NewColumnProps = {
  setShowNewColumnModal: Dispatch<SetStateAction<boolean>>;
};

const NewColumn = ({ setShowNewColumnModal }: NewColumnProps) => {
  return (
    <div className="flex ml-auto flex-col">
      <button
        onClick={() => setShowNewColumnModal(true)}
        className="flex items-center w-[17.5rem] justify-center text-[clamp(1.2rem,3vw,1.5rem)] font-[700] text-[#828fa3] bg-[linear-gradient(to_bottom,rgba(121,132,147,.2),rgba(130,143,163,.1),rgba(130,143,163,0))] h-full rounded-[6px] transition-[color_.2s_ease]"
      >
        + New Column
      </button>
    </div>
  );
};

export default NewColumn;
