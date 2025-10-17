import React, { ReactNode } from "react";

const DarkButton = ({
  children,
  onClick,
}: {
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="
        bg-gradient-to-r from-purple-700 to-purple-900
        text-white font-semibold
        px-6 py-2 rounded-xl
        shadow-md hover:shadow-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-purple-400
      "
    >
      {children}
    </button>
  );
};

export default DarkButton;
