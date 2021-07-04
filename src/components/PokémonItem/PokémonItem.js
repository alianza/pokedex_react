import './PokémonItem.scss'
import React, {Component} from "react";
import {Pokémon} from "../../entity/Pokémon";
import capitalize from "../../helpers/Capitalize";
import typeToColor from "../../helpers/TypeToColor";
import PokémonService from "../../helpers/services/PokémonService";
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
            <div className="pokémon" style={this.state.pokémon.sprites.front_default ?
                    {backgroundImage: 'url(' + this.state.pokémon.sprites.front_default + ')'} :
                    {backgroundImage: `url(${pokéball_closed})`, backgroundSize: '50%', backgroundPosition: 'center'}}>
                    <h3 className="pokémon-name">{capitalize(this.props.pokémonRef.name)}</h3>
                    {this.state.pokémon.types[0].type && <p className="pokémon-type"
                                                            style={{backgroundColor: typeToColor(this.state.pokémon.types[0].type.name)}}>
                        {capitalize(this.state.pokémon.types[0].type.name)}</p>}
                </div>
        );
    }

    componentDidMount() {
        if (this.props.pokémonRef.url) {
            this.loadPokémon();
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevState.pokémon.name !== this.props.pokémonRef.name) {
            if (this.props.pokémonRef.url) {
                this.loadPokémon();
            }
        }
    }

    loadPokémon = () => {
        PokémonService.getPokémon(this.props.pokémonRef.name).then(json => {
            if (json) {
                this.setState({pokémon: json});
            }
        });
    }
}

export default PokémonItem;
