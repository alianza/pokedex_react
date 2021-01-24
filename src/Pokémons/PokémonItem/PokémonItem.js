import './PokémonItem.scss'
import React, {Component} from "react";
import {Pokémon} from "../../entity/Pokémon";
import capitalize from "../../helpers/Capitalize";
import typeToColor from "../../helpers/TypeToColor";
import PokémonService from "../../PokémonService/PokémonService";
import pokéball_closed from "../../img/pokéball_closed.png"

class PokémonItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokémon: new Pokémon()
        }
    }

    render() {
        return (
            <div className="pokemon"
                 style={this.state.pokémon.sprites.front_default ?
                     {backgroundImage: 'url(' + this.state.pokémon.sprites.front_default + ')'} :
                     {backgroundImage: `url(${pokéball_closed})`,
                     backgroundSize: '50%',
                     backgroundPosition: 'center'}}>
                <h3 className="pokemon-name">{capitalize(this.props.pokémonRef.name)}</h3>
                {this.state.pokémon.types[0].type && <p className="pokemon-type" style={{backgroundColor: typeToColor(this.state.pokémon.types[0].type.name)}}>{this.state.pokémon.types[0].type.name}</p>}
            </div>
        );
    }

    componentDidMount() {
        this.loadPokémon();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevState.pokémon.name !== this.props.pokémonRef.name) {
            this.loadPokémon();
        }
    }

    loadPokémon = () => {
        PokémonService.doLoad(this.props.pokémonRef.url).then(json => {this.setState({pokémon: json});});
    }
}

export default PokémonItem;
