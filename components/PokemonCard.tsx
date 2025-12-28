import { Pokemon } from "@/interfaces/pokemon";
import Image from "next/image";
import Badge from "./Badge";
import { typeColors } from "@/lib/consts";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center p-4 bg-slate-700/5 hover:bg-slate-700/10 rounded shadow-xl hover:shadow-2xl transition duration-300 hover:text-amber-300">
      <Image
        src={pokemon.sprites.other?.["official-artwork"].front_default || ""}
        alt={pokemon.name}
        className="hover:scale-110 transition duration-300"
        width={218}
        height={218}
      />
      <div className="flex gap-2 items-center">
        {pokemon.types.map((type) => (
          <Badge key={type.type.name} className={typeColors[type.type.name]}>
            {type.type.name}
          </Badge>
        ))}
      </div>
      <h2 className="text-2xl font-bold">{pokemon.name}</h2>
    </div>
  );
}
