import React from "react";

const CharCardSkeleton = () => {
  return (
    <div className="mt-4 flex h-full min-h-36 w-full min-w-72 animate-pulse cursor-pointer flex-row self-center justify-self-center rounded-lg bg-zinc-700 hover:bg-zinc-600" />
  );
};

export default CharCardSkeleton;
