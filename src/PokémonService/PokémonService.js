const baseUrl = "https://pokeapi.co/api/v2";

const PokémonService = {
    doLoad(url) { // Base method for doing http Get requests

        if (!url.includes(baseUrl)) {
            url = baseUrl + url
        }
        // console.log(url)
        return fetch(url)
            .then(response => response.json())
            // .then(data => {console.log(data)})
            .then( data => {return data});
    },

    getPokemons() {
        return this.doLoad('/pokemon').then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },

    getPokémon(pokémonName) {
        return this.doLoad(`/pokemon/${pokémonName}`).then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },

    getTypes() {
        return this.doLoad('/type/').then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },

    getTypePokémons(type) {
        return this.doLoad(`/type/${type}`).then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },

    getRandomPokémon() {
        return this.getTotalNumberOfPokémon().then(json => {
            const totalNumberOfPokémon = json.count
            const randomIndex = Math.floor(Math.random() * (totalNumberOfPokémon - 1)) + 1
            return this.doLoad(`/pokemon/${randomIndex}`).then(jsonData => {
                return jsonData
            }).catch(e => { console.log('Error', e) });
        })
    },

    getTotalNumberOfPokémon() {
        return this.doLoad('/pokemon-species/?limit=0').then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },
}

export default PokémonService
