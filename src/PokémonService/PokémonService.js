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

    loadPokemons() {
        return this.doLoad('/pokemon').then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },

    loadPokémon(pokémonName) {
        return this.doLoad(`/pokemon/${pokémonName}`).then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },

    getTotalNumberOfPokemon() {
        return this.doLoad('/pokemon-species/?limit=0').then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },

    loadTypes() {
        return this.doLoad('/type/').then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },

    loadTypePokémons(type) {
        return this.doLoad(`/type/${type}`).then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    },

    loadRandomPokemon(randomIndex) {
        return this.doLoad('/pokemon/' + randomIndex).then(jsonData => {
            return jsonData
        }).catch(e => { console.log('Error', e) });
    }
}

export default PokémonService
