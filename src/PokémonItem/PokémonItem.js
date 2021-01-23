import './PokémonItem.scss'
import PokémonService from "../PokémonService/PokémonService";
import capitalize from "../helpers/Capitalize";
import React, {Component} from 'react';
import {Pokémon} from "../entity/Pokémon";
import TypeToColor from "../helpers/TypeToColor";

class PokémonItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokémon: new Pokémon()
        }
    }

    render() {
        return (
            <div className="pokemon" onClick={e => this.props.onPokemonClick(this.state.pokémon, e)}
                 style={this.state.pokémon.sprites.front_default ?
                     {backgroundImage: 'url(' + this.state.pokémon.sprites.front_default + ')'} :
                     {backgroundImage: 'url(./placeholder.png)',
                     backgroundSize: '50%',
                     backgroundPosition: 'center'}}>
                <h3 className="pokemon-name">{capitalize(this.props.pokémonRef.name)}</h3>
                {this.state.pokémon.types[0].type && <p className="pokemon-type" style={{backgroundColor: TypeToColor(this.state.pokémon.types[0].type.name)}}>{this.state.pokémon.types[0].type.name}</p>}
            </div>
        );
    }

    componentDidMount() {
        PokémonService.doLoad(this.props.pokémonRef.url).then(json => {this.setState({pokémon: json}); console.log(this.state)});
    }
}

export default PokémonItem;
