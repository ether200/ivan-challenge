import { Episode } from "@/interfaces/episode";
import React from "react";

import Divider from "../divider";
import EpisodeCardSkeleton from "../skeletons/EpisodeCardSkeleton";

type EpisodeCardProps = {
  data: Episode[] | Episode;
  title: string;
  isLoading?: boolean;
};

const EpisodeCard: React.FC<EpisodeCardProps> = ({ data, title, isLoading }) => {
  if (isLoading) {
    return <EpisodeCardSkeleton />;
  }
  return (
    <div className="h-full max-h-80 min-h-80 w-full overflow-y-auto rounded bg-zinc-300 p-4 md:w-1/3 dark:bg-zinc-700">
      <h3 className="text-center font-semibold">{title}</h3>
      <ul className="mt-6 px-2 text-sm">
        {!Array.isArray(data) && data ? (
          <li>
            <p>
              <span className="font-semibold">{data?.episode}</span> - {data?.name} - {data?.air_date}
            </p>
          </li>
        ) : (
          data?.map((ep, i, arr) => (
            <li key={ep.episode}>
              <p>
                <span className="font-semibold">{ep.episode}</span> - {ep.name} - {ep.air_date}
              </p>
              {i + 1 !== arr.length && <Divider direction="horizontal" />}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default EpisodeCard;
