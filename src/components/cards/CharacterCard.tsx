import Image from "next/image";
import React from "react";

type CardProps = {
  name: string;
  status: string;
  race: string;
  imgSrc: string;
  onClick: () => void;
  selected: boolean;
  disabled: boolean | undefined;
};

const Card: React.FC<CardProps> = ({ name, status, race, imgSrc, onClick, selected, disabled }) => {
  return (
    <div
      onClick={onClick}
      className={`relative mt-4 flex h-full max-h-36 w-full max-w-72 cursor-pointer flex-row self-center justify-self-center rounded-lg transition ease-in-out ${selected ? "border-2 border-solid border-sky-500" : ""} z-0 bg-zinc-300 dark:bg-zinc-700 ${!disabled ? "hover:scale-105" : ""}`}
    >
      {disabled && <div className="absolute left-0 top-0 z-10 h-full w-full rounded-lg bg-zinc-700 bg-opacity-60" />}
      <figure className="h-full w-full">
        <Image
          src={imgSrc}
          alt="alt"
          width={144}
          height={144}
          objectFit="cover"
          className="h-full rounded-bl-lg rounded-tl-lg"
        />
      </figure>
      <div className="flex h-full w-full flex-col p-2">
        <h3 className="font-semibold">
          <span className="line-clamp-2">{name}</span>
        </h3>
        <div className="flex h-fit w-full flex-col space-y-1">
          <div className="flex flex-row items-center space-x-1">
            <span
              className={`h-2 w-2 rounded-full ${status === "Alive" ? "bg-green-500" : status === "Dead" ? "bg-red-500" : "bg-yellow-500"}`}
            />
            <h4 className="text-sm capitalize">{status}</h4>
          </div>
          <span className="text-xs">{race}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
