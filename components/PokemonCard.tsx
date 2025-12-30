import { getAvailableSprite, Pokemon, PokemonType } from "@/interfaces/pokemon";
import Image from "next/image";
import Badge from "./Badge";
import { typeColors } from "@/lib/consts";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className="w-[320px] h-[320px] overflow-hidden flex flex-col gap-2 items-center justify-center p-4 bg-slate-700/5 hover:bg-slate-700/10 rounded shadow-xl hover:shadow-2xl transition duration-300 hover:text-amber-300">
      <Image
        src={getAvailableSprite(pokemon.sprites)}
        alt={pokemon.name}
        className="hover:scale-110 transition duration-300 max-w-[218px] max-h-[218px] object-cover"
        width={218}
        height={218}
      />
      <div className="flex gap-2 items-center">
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
