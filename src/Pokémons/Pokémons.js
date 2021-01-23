import React, {Component} from 'react';
import './Pokémons.scss'
import PokémonItem from "../PokémonItem/PokémonItem";

class Pokémons extends Component {
    render() {
        return (
            <div className="pokemons">
                <div className="pokemons-header">
                    <h1>Pick a creature!</h1>
                    <div onClick={this.sort} className="button button-sort">Sort ⇕</div>
                </div>
                <ul className="pokemons-list">
                        {this.props.jsonData.results ?
                            this.props.jsonData.results.map((e, i) => {
                                return <li className="pokemons-item" key={i}>
                                          <PokémonItem pokémonRef={e}/>
                                       </li>})
                            : "Loading..." }
            </ul>
                {!this.props.jsonData.results && <h2>No results :(</h2>}
    </div>
        );
    }
    componentDidMount() {
        console.log(this.props.match);
        console.log(this.props.jsonData);
    }

    sort() {

    }
}

export default Pokémons;
