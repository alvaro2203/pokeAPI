const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getQueryParams = (limit: number, offset: number) =>
  `?limit=${limit}&offset=${offset}`;

export const getPokemons = async (limit: number = 20, offset: number = 0) => {
  const response = await fetch(`${API_URL}${getQueryParams(limit, offset)}`);
  const data = await response.json();
  return data;
};

export const getAllPokemons = async () => {
  return getPokemons(10000, 0);
};

export const getPokemonByName = async (name: string) => {
  const response = await fetch(`${API_URL}/${name}`);
  const data = await response.json();
  return data;
};
