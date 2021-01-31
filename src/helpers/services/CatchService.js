const CatchService = {
    add(pokémon)  {
        let pokémons = this.getAll() || [];
        pokémons.unshift(pokémon); // Add pokémon to beginning of array
        localStorage.setItem('pokémons', JSON.stringify(pokémons));
    },

    remove(pokémonName)  {
        let pokémons = this.getAll() || [];
        pokémons.forEach(function (pokémon, index) {
            if (pokémon.name === pokémonName) {
                pokémons.splice(index, 1);
            }
        });
        localStorage.setItem('pokémons', JSON.stringify(pokémons));
    },

    get(pokémonName) {
        let pokémonToReturn;
        let pokémons = this.getAll() || [];
        pokémons.forEach(function (pokémon) {
            if (pokémon.name === pokémonName) {
                pokémonToReturn = pokémon;
            }
        });
        return pokémonToReturn;
    },

    getAll() {
        return JSON.parse(localStorage.getItem('pokémons'));
    }
}

export default CatchService;
