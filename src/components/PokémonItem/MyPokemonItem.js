import './PokémonItem.scss'
import React, {Component} from "react";
import capitalize from "../../helpers/Capitalize";
import typeToColor from "../../helpers/TypeToColor";
import pokéball_closed from "../../img/pokéball_closed.png"

class MyPokémonItem extends Component {
    render() {
        return (
            <div className="pokemon" style={this.props.pokémon.sprites.front_default ?
                     {backgroundImage: 'url(' + this.props.pokémon.sprites.front_default + ')'} :
                     {backgroundImage: `url(${pokéball_closed})`, backgroundSize: '50%', backgroundPosition: 'center'}}>
                <h3 className="pokemon-name">{capitalize(this.props.pokémon.name)}</h3>
                {this.props.pokémon.types[0].type && <p className="pokemon-type"
                style={{backgroundColor: typeToColor(this.props.pokémon.types[0].type.name)}}>
                {capitalize(this.props.pokémon.types[0].type.name)}</p>}
            </div>
        );
    }
}

export default MyPokémonItem;
