
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface PokemonSprites {
    front_default: string | StaticImport;
    front_shiny: string | StaticImport;
    front_female: string | StaticImport | null;
    front_shiny_female: string | StaticImport | null;
    back_default: string | StaticImport;
    back_shiny: string | StaticImport;
    back_female: string | StaticImport | null;
    back_shiny_female: string | StaticImport | null;
    other?: PokemonSpritesOther;
    versions?: PokemonSpritesVersions;
    animated?: PokemonSprites;
}

export interface PokemonSpritesOther {
    dream_world: {
        front_default: string | StaticImport;
        front_female: string | StaticImport | null;
    };
    home: {
        front_default: string | StaticImport;
        front_female: string | StaticImport | null;
        front_shiny: string | StaticImport;
        front_shiny_female: string | StaticImport | null;
    };
    "official-artwork": {
        front_default: string | StaticImport;
        front_shiny: string | StaticImport;
    };
    showdown: {
        front_default: string | StaticImport;
        front_female: string | StaticImport | null;
        front_shiny: string | StaticImport;
        front_shiny_female: string | StaticImport | null;
        back_default: string | StaticImport;
        back_female: string | StaticImport | null;
        back_shiny: string | StaticImport;
        back_shiny_female: string | StaticImport | null;
    };
}

export interface PokemonSpritesVersions {
    "generation-i": {
        "red-blue": GenerationISprite;
        yellow: GenerationISprite;
    };
    "generation-ii": {
        crystal: GenerationIISprite;
        gold: GenerationIISprite;
        silver: GenerationIISprite;
    };
    "generation-iii": {
        emerald: GenerationIIISprite;
        "firered-leafgreen": GenerationIIISprite;
        "ruby-sapphire": GenerationIIISprite;
    };
    "generation-iv": {
        "diamond-pearl": GenerationIVSprite;
        "heartgold-soulsilver": GenerationIVSprite;
        platinum: GenerationIVSprite;
    };
    "generation-v": {
        "black-white": GenerationVSprite;
    };
    "generation-vi": {
        "omegaruby-alphasapphire": GenerationVISprite;
        "x-y": GenerationVISprite;
    };
    "generation-vii": {
        "icons": GenerationVIISprite;
        "ultra-sun-ultra-moon": GenerationVIISprite;
    };
    "generation-viii": {
        "icons": GenerationVIIISprite;
    };
}

export interface GenerationISprite {
    back_default: string | StaticImport;
    back_gray: string | StaticImport;
    back_transparent: string | StaticImport;
    front_default: string | StaticImport;
    front_gray: string | StaticImport;
    front_transparent: string | StaticImport;
}

export interface GenerationIISprite {
    back_default: string | StaticImport;
    back_shiny: string | StaticImport;
    front_default: string | StaticImport;
    front_shiny: string | StaticImport;
    front_transparent?: string | StaticImport;
}

export interface GenerationIIISprite {
    back_default: string | StaticImport;
    back_shiny: string | StaticImport;
    front_default: string | StaticImport;
    front_shiny: string | StaticImport;
}

export interface GenerationIVSprite {
    back_default: string | StaticImport;
    back_shiny: string | StaticImport;
    back_female: string | StaticImport | null;
    back_shiny_female: string | StaticImport | null;
    front_default: string | StaticImport;
    front_shiny: string | StaticImport;
    front_female: string | StaticImport | null;
    front_shiny_female: string | StaticImport | null;
}

export interface GenerationVSprite {
    back_default: string | StaticImport;
    back_shiny: string | StaticImport;
    back_female: string | StaticImport | null;
    back_shiny_female: string | StaticImport | null;
    front_default: string | StaticImport;
    front_shiny: string | StaticImport;
    front_female: string | StaticImport | null;
    front_shiny_female: string | StaticImport | null;
    animated?: PokemonSprites;
}

export interface GenerationVISprite {
    front_default: string | StaticImport;
    front_shiny: string | StaticImport;
    front_female: string | StaticImport | null;
    front_shiny_female: string | StaticImport | null;
}

export interface GenerationVIISprite {
    front_default: string | StaticImport;
    front_shiny: string | StaticImport;
    front_female: string | StaticImport | null;
    front_shiny_female: string | StaticImport | null;
}

export interface GenerationVIIISprite {
    front_default: string | StaticImport;
    front_female: string | StaticImport | null;
}
