const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPokemons = async () => {
    const response = await fetch(`${API_URL}?limit=20`);
    const data = await response.json();
    return data.results;
}

export const getPokemonByName = async (name: string) => {
    const response = await fetch(`${API_URL}/${name}`);
    const data = await response.json();
    return data;
}