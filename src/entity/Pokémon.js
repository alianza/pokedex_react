class Type {
    name: { 'background-color': string } | { background: string };
    url: string;
}

class Types {
    slot: number;
    type: Type;
}

class Sprites {
    front_default: string;
    back_default: string;
}

class Stat {
    name: string;
    url: string;
}

class Stats {
    base_stat: number;
    effort: number;
    stat: Stat;
}

export class Pokémon {
    constructor() {
        this.name = '';
        this.types = new Array(new Type())
        this.sprites = new Sprites();
    }

    name: String;
    base_experience: number;
    height: number;
    weight: number;
    sprites: Sprites;
    stats: Stats[];
    types: Types[];
    date: string | undefined;
}
