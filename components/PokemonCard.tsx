import { Pokemon } from "@/interfaces/pokemon";
import Image from "next/image";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-4 bg-slate-700/5 hover:bg-slate-700/10 rounded shadow-xl hover:shadow-2xl transition duration-300 hover:text-amber-300">
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="hover:scale-110 transition duration-300"
        width={256}
        height={256}
      />
      <h2 className="text-2xl font-bold">{pokemon.name}</h2>
    </div>
  );
}
