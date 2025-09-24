import React, { ReactNode } from "react";

const PrimaryButton = ({
  children,
  width,
  onClick,
}: {
  onClick: () => void;
  children: ReactNode;
  width: { x: number; y: number };
}) => {
  const paddingX: Record<number, string> = {
    2: "px-2",
    3: "px-3",
    4: "px-4",
    5: "px-5",
    6: "px-6",
    7: "px-7",
    10: "px-10",
    20: "px-20",
  };

  const paddingY: Record<number, string> = {
    2: "py-2",
    3: "py-3",
    4: "py-4",
    5: "py-5",
    6: "py-6",
    7: "py-7",
    10: "py-10",
    20: "py-20",
  };

  return (
    <div
      onClick={onClick}
      className={`
        ${paddingX[width.x]} ${paddingY[width.y]}
        flex items-center justify-center
        hover:bg-amber-50 cursor-pointer
        hover:shadow-md
        bg-amber-500 text-black rounded-xl text-sm
      `}
    >
      {children}
    </div>
  );
};

export default PrimaryButton;
