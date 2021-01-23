import React, {Component} from 'react';
import './Pokémons.scss'

class Pokémons extends Component {
    render() {
        return (
            <div className="pokemons">
                <div className="pokemons-header">
                    <h1>Pick a creature!</h1>
                    <div className="button button-sort">Sort ⇕</div>
                </div>
                <ul className="pokemons-list">
                    <li className="pokemons-item">
                        {this.props.jsonData.results ?
                            this.props.jsonData.results.map((e, i) => {
                                return <span className="busterCards" key={i}>♦ {e.name}</span>})
                            : "Loading..." }
                </li>
            </ul>
                {!this.props.jsonData.results && <h2>No results :(</h2>}
    </div>
        );
    }
    componentDidMount() {
        console.log(this.props.match);
        console.log(this.props.jsonData);
    }
}

export default Pokémons;
