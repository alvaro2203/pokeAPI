import { getAvailableSprite, Pokemon, PokemonType } from "@/interfaces/pokemon";
import Image from "next/image";
import Badge from "./Badge";
import { typeColors } from "@/lib/consts";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="flex h-[320px] w-[320px] flex-col items-center justify-center gap-2 overflow-hidden rounded bg-slate-700/5 p-4 shadow-xl transition duration-300 hover:bg-slate-700/10 hover:text-amber-300 hover:shadow-2xl">
      <Image
        src={getAvailableSprite(pokemon.sprites)}
        alt={pokemon.name}
        className="max-h-[218px] max-w-[218px] object-cover transition duration-300 hover:scale-110"
        width={218}
        height={218}
      />
      <div className="flex items-center gap-2">
        {pokemon.types.map((type: PokemonType) => (
          <Badge key={type.type.name} className={typeColors[type.type.name]}>
            {type.type.name}
          </Badge>
        ))}
      </div>
      <h2 className="text-lg font-bold uppercase">{pokemon.name}</h2>
    </div>
  );
}
