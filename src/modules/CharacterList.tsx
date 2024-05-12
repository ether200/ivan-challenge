"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "@/constants/config";
import { Character, SelectedCharacter } from "@/interfaces/character";
import fetcher from "@/services";
import React from "react";
import useSWR from "swr";

import CharacterCard from "@/components/cards/CharacterCard";
import Pagination from "@/components/pagination";
import CharCardSkeleton from "@/components/skeletons/CharCardSkeleton";

type CharacterListProps = {
  page: number;
  characters: SelectedCharacter;
  keyList: number | string;
  handleCharSelection: (keyList: number | string, char: Character, disabled?: boolean) => void;
  onPageChange: (keyList: number | string, page: number) => void;
};

const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  keyList,
  handleCharSelection,
  page,
  onPageChange,
}) => {
  const { data, isLoading, error } = useSWR(`${config.apiUrl}/character/?page=${page}`, fetcher);

  const handleDisableCard = (charId: string | number) => {
    for (const [key, value] of Object.entries(characters)) {
      if (value?.id === charId && key !== keyList.toString()) return true;
    }
  };

  if (error) {
    return <p className="my-8 text-center">An error has occurred, please try again later.</p>;
  }

  return (
    <div className="w-full flex-col space-y-8">
      <div className="grid w-full auto-rows-auto grid-cols-1 gap-4 lg:grid-cols-2">
        {isLoading
          ? [...Array(config.itemsPerPage)].map((_, i) => <CharCardSkeleton key={i} />)
          : data?.results?.map((char: Character) => (
              <CharacterCard
                name={char.name}
                status={char.status}
                race={char.species}
                key={char.id}
                imgSrc={char.image}
                onClick={() => handleCharSelection(keyList, char, handleDisableCard(char?.id))}
                selected={characters[keyList]?.id === char.id}
                disabled={handleDisableCard(char?.id)}
              />
            ))}
      </div>
      <Pagination page={page - 1} pageCount={data?.info?.pages} onPageChange={onPageChange} keyList={keyList} />
    </div>
  );
};

export default CharacterList;
