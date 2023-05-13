import { useState } from "react";

interface ThemeSwitchProps {
  isDark: boolean;
  onToggle: (isDark: boolean) => void;
}

const ThemeSwitch = ({ isDark, onToggle }: ThemeSwitchProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(isDark);

  const handleToggle = () => {
    const newIsDark = !isChecked;
    setIsChecked(newIsDark);
    onToggle(newIsDark);
  };

  return (
    <div className="flex items-center">
      <label
        htmlFor="theme-switch"
        className="flex items-center cursor-pointer"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="theme-switch"
            className="sr-only"
            checked={isChecked}
            onChange={handleToggle}
          />
          <div className="block bg-indigo-500 w-[40px] h-[20px] rounded-full"></div>
          <div
            className={`dot absolute left-1 top-[0.20rem] bg-white w-[14px] h-[14px] rounded-full transition ${
              isChecked ? "transform translate-x-[19px] " : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default ThemeSwitch;
