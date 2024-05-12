import React from "react";

type DividerProps = {
  direction: "horizontal" | "vertical";
};

const Divider: React.FC<DividerProps> = ({ direction }) => {
  const directionClass = direction === "horizontal" ? "h-px my-2 w-full" : "w-px mx-2 h-screen";

  return (
    <hr
      className={`border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400 ${directionClass}`}
    />
  );
};

export default Divider;
