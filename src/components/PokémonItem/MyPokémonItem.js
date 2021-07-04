import './PokémonItem.scss'
import React, {Component} from "react";
import capitalize from "../../helpers/Capitalize";
import typeToColor from "../../helpers/TypeToColor";
import pokéball_closed from "../../img/pokéball_closed.png"

class MyPokémonItem extends Component {

    options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    render() {
        return (
            <div className="pokémon my_pokémon" style={this.props.pokémon.sprites.front_default ?
                     {backgroundImage: 'url(' + this.props.pokémon.sprites.front_default + ')'} :
                     {backgroundImage: `url(${pokéball_closed})`, backgroundSize: '50%', backgroundPosition: 'center'}}>
                <div>
                    <h3 className="pokémon-name">{capitalize(this.props.pokémon.name)}</h3>
                    <h5 className="pokémon-date">{new Date(this.props.pokémon.date).toLocaleDateString("en-US", this.options)}</h5>
                </div>
                {this.props.pokémon.types[0].type && <p className="pokémon-type"
                style={{backgroundColor: typeToColor(this.props.pokémon.types[0].type.name)}}>
                {capitalize(this.props.pokémon.types[0].type.name)}</p>}
            </div>
        );
    }
}

export default MyPokémonItem;
