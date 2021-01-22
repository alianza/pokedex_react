import React, {Component} from 'react';
import './Pokémons.scss'

class PokéMons extends Component {
    render() {
        return (
            <div className="pokemons">
                <div className="pokemons-header">
                    <h1>Pick a creature!</h1>
                    <div className="button button-sort">Sort ⇕</div>
                </div>
                <ul className="pokemons-list">
                    <li className="pokemons-item">
                        awdawd
                </li>
            </ul>
        <h2>No results :(</h2>
    </div>
        );
    }
    componentDidMount() {
        console.log(this.props.match);
    }
}

export default PokéMons;
