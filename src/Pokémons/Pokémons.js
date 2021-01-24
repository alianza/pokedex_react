import React, {Component} from 'react';
import './Pokémons.scss'
import PokémonItem from "./PokémonItem/PokémonItem";
import {Link} from "react-router-dom";
import PokémonService from "../PokémonService/PokémonService";

class Pokémons extends Component {
    render() {
        return (
            <div className="pokemons">
                <div className="pokemons-header">
                    <h1>Pick a creature!</h1>
                    <div onClick={this.sort} className="button button-sort">Sort ⇕</div>
                </div>
                <ul className="pokemons-list">
                        {this.state &&
                            this.state.jsonData.results.map((e, i) => {
                                return <li className="pokemons-item" key={i}>
                                    <Link to={`/pokémon/${e.name}`}><PokémonItem onPokemonClick={this.onPokémonClick} pokémonRef={e}/></Link>
                                       </li>})
                        }
            </ul>
                {!this.props.jsonData.results && <h2>No results :(</h2>}
    </div>
        );
    }

    componentDidMount() {
        this.initData()
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.props.match.params !== prevProps.match.params) {
            this.initData()
        }
    }

    initData = () => {
        if (this.props.match.params.type) {
            console.log("Load type Pokémons")
        } else {
            this.loadPokémons()
        }
    }

    loadPokémons = () => {
        PokémonService.loadPokemons().then(json => {this.setState({jsonData: json});});
    }

    onPokémonClick = (e, pokémon) => {
        this.props.onPokémonClick(e, pokémon)
    }

    sort = () => {

    }
}

export default Pokémons;
