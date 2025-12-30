const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getPokemons = async (limit: number = 20, offset: number = 0) => {
    const response = await fetch(`${API_URL}?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data;
}

export const getPokemonByName = async (name: string) => {
    const response = await fetch(`${API_URL}/${name}`);
    const data = await response.json();
    return data;
}