"use client";

import { CHARACTER_INITIAL_STATE, PAGINATION_INITIAL_STATE } from "@/constants/initialState";
import { Character, SelectedCharacter } from "@/interfaces/character";
import { Pagination } from "@/interfaces/pagination";
import HomeLayout from "@/layouts/home";
import CharacterList from "@/modules/CharacterList";
import EpisodeList from "@/modules/EpisodeList";
import { extractEpisodeNumber } from "@/utils/episode";
import React from "react";

import Divider from "@/components/divider";

export default function Home() {
  const epSectionRef = React.useRef<null | HTMLDivElement>(null);
  const titleSectionRef = React.useRef<null | HTMLDivElement>(null);
  const [pagination, setPagination] = React.useState<Pagination>(PAGINATION_INITIAL_STATE);
  const [characters, setCharacters] = React.useState<SelectedCharacter>(CHARACTER_INITIAL_STATE);
  const hasSelectedCharacters = Object.keys(characters)?.every((key: string | number) =>
    characters[key].hasOwnProperty("episodes"),
  );

  const handlePagination = (keyList: number | string, page: number) =>
    setPagination({ ...pagination, [keyList]: page });

  const handleCharSelection = (keyList: number | string, char: Character, disabled?: boolean) => {
    if (disabled) return;
    if (characters[keyList]?.id === char?.id) {
      return setCharacters({ ...characters, [keyList]: {} });
    }
    const episodes = char.episode?.map((ep: string) => extractEpisodeNumber(ep));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    setCharacters({ ...characters, [keyList]: { id: char.id, name: char.name, episodes } });
  };

  const handleRestart = () => {
    setPagination(PAGINATION_INITIAL_STATE);
    setCharacters(CHARACTER_INITIAL_STATE);

    if (titleSectionRef?.current) {
      return titleSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  return (
    <HomeLayout>
      <main className="min-w-screen my-8 flex min-h-screen">
        <div className="container mx-auto px-4 md:px-0">
          <div className="flex scroll-m-52 flex-col space-y-4" ref={titleSectionRef}>
            <h1 className="text-2xl font-bold">Overview</h1>
            <p>Pick a character of each list and see the episodes they were in!</p>
          </div>
          <div className="mt-8 flex w-full flex-col justify-center gap-4 md:flex-row">
            {Object.keys(characters).map((key, i, arr) => (
              <>
                <div key={key}>
                  <CharacterList
                    page={pagination[key]}
                    characters={characters}
                    keyList={key}
                    handleCharSelection={handleCharSelection}
                    onPageChange={handlePagination}
                  />
                </div>
                {i + 1 !== arr.length && (
                  <>
                    <span className="hidden md:inline-block">
                      <Divider direction="vertical" />
                    </span>
                    <span className="contents md:hidden">
                      <Divider direction="horizontal" />
                    </span>
                  </>
                )}
              </>
            ))}
          </div>
          {hasSelectedCharacters && (
            <>
              <EpisodeList fetchCondition={hasSelectedCharacters} characters={characters} ref={epSectionRef} />
              <p className="mt-8 text-center">
                If you want to restart everything press{" "}
                <button className="font-bold underline" onClick={handleRestart}>
                  here.
                </button>
              </p>
            </>
          )}
        </div>
      </main>
    </HomeLayout>
  );
}
