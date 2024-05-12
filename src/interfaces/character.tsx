export interface SelectedCharacter {
  [key: number | string]: {
    id?: string | number;
    name?: string;
    episodes?: string[];
  };
}

export interface Character {
  id: number | string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  image: string;
  episode: string[];
}
