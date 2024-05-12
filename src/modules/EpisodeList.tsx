/* eslint-disable react/display-name */
import config from "@/constants/config";
import { SelectedCharacter } from "@/interfaces/character";
import { Episode } from "@/interfaces/episode";
import fetcher from "@/services";
import React from "react";
import useSWR from "swr";

import EpisodeCard from "@/components/cards/EpisodeCard";

type EpisodeListProps = {
  fetchCondition: boolean;
  characters: SelectedCharacter;
};

const EpisodeList = React.forwardRef<HTMLDivElement, EpisodeListProps>(
  ({ fetchCondition, characters }, forwardedRef) => {
    const ref = React.useRef<null | HTMLDivElement>(null);
    React.useImperativeHandle(forwardedRef, () => ref.current as HTMLInputElement);
    const {
      data: episodesOne,
      isLoading: episodesOneLoader,
      error: episodesOneError,
    } = useSWR(
      () => (fetchCondition ? `${config.apiUrl}/episode/${characters[1]?.episodes?.toString()}` : null),
      fetcher,
    );
    const {
      data: episodesTwo,
      isLoading: episodesTwoLoader,
      error: episodesTwoError,
    } = useSWR(
      () => (fetchCondition ? `${config.apiUrl}/episode/${characters[2]?.episodes?.toString()}` : null),
      fetcher,
    );

    const getSharedEpisodes = () => {
      let ep1 = episodesOne;
      let ep2 = episodesTwo;
      if (!Array.isArray(ep1)) {
        ep1 = [ep1];
      }
      if (!Array.isArray(ep2)) {
        ep2 = [ep2];
      }
      const sharedEpisodes = ep1
        ?.map((ep: Episode) => ep2.find((epTwo: Episode) => ep?.id === epTwo?.id))
        .filter((item: undefined | string) => item);

      if (ref?.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
      return sharedEpisodes;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sharedEpisodes = React.useMemo(() => getSharedEpisodes(), [episodesOne, episodesTwo]);

    if (episodesOneError || episodesTwoError) {
      return <p className="my-8 text-center">An error has occurred, please try again later.</p>;
    }

    return (
      <div
        className="mt-8 flex w-full scroll-m-48 flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0"
        ref={ref}
      >
        <EpisodeCard data={episodesOne} title={`${characters[1]?.name} episodes`} isLoading={episodesOneLoader} />
        <EpisodeCard data={sharedEpisodes} title={`${characters[1]?.name} & ${characters[2]?.name} shared episodes`} />

        <EpisodeCard data={episodesTwo} title={`${characters[2]?.name} episodes`} isLoading={episodesTwoLoader} />
      </div>
    );
  },
);

export default EpisodeList;
