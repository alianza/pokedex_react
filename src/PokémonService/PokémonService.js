
const PokémonService = {
    baseUrl: "https://pokeapi.co/api/v2",
    basePageLimit: 20,
    totalNumberOfPokémon: 0,

    doLoad(url) { // Base method for doing http Get requests
        if (!url.includes(this.baseUrl)) {
            url = this.baseUrl + url;
        }

        // console.log(url)
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                return data})
    },

    getPokémons() {
        return this.doLoad('/pokemon').then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getPagedPokémons(offset) {
        return this.doLoad(`/pokemon?offset=${offset}&limit=${this.basePageLimit}`).then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getPokémon(pokémonName) {
        return this.doLoad(`/pokemon/${pokémonName}`).then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getTypes() {
        return this.doLoad('/type/').then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getTypePokémons(type) {
        return this.doLoad(`/type/${type}`).then(jsonData => {
            return jsonData;
        }).catch(e => { console.log('Error', e) });
    },

    getRandomPokémon() {
        return this.getTotalNumberOfPokémon().then(() => {
            const randomIndex = Math.floor(Math.random() * (this.totalNumberOfPokémon - 1)) + 1;
            return this.getPokémon(randomIndex).then(jsonData => { return jsonData; })
                .catch(e => {console.log('Error', e)});
        });
    },

    getTotalNumberOfPokémon() {
        if (!this.totalNumberOfPokémon) {
            return this.doLoad('/pokemon-species/?limit=0').then(jsonData => {
                this.totalNumberOfPokémon = jsonData.count;
                return jsonData;
            }).catch(e => { console.log('Error', e) });
        } else {
            return new Promise(resolve => {resolve(this.totalNumberOfPokémon)})
        }
    },
}

export default PokémonService
