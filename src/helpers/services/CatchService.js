import { Pokémon } from "../../entity/Pokémon";

const CatchService = {
    add(pokémon)  { // Add to the array and save in local storage
        let pokémons = this.getAll() || []; // Retrieve all
        pokémons.unshift(pokémon); // Add pokémon to beginning of array
        localStorage.setItem('pokémons', JSON.stringify(pokémons)); // Save in local storage
    },

    remove(pokémonName)  { // Remove from the array and save in local storage
        let pokémons = this.getAll() || []; // Retrieve all
        pokémons.forEach(function (pokémon, index) { // Iterate though all
            if (pokémon.name === pokémonName) { pokémons.splice(index, 1); } // Compare names, if match remove it
        });
        localStorage.setItem('pokémons', JSON.stringify(pokémons)); // Save in local storage
    },

    get(pokémonName): Pokémon { // Get array and find specific pokémon based on name
        let pokémons = this.getAll() || []; // Retrieve all
        pokémons.forEach(function (pokémon) { // Iterate though all
            if (pokémon.name === pokémonName) { return pokémon; } // Compare name, if match return it
        });
    },

    getAll(): Pokémon[] { // Get the entire array of pokémon and parse it
        return JSON.parse(localStorage.getItem('pokémons')); // Retrieve all
    }
}

export default CatchService;
