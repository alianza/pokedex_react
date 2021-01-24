import './PokémonDetails.scss'
import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import PokémonService from "../PokémonService/PokémonService";
import capitalize from "../helpers/Capitalize";
import typeToColor from "../helpers/TypeToColor";

class PokémonDetails extends Component {
    render() {
        return (
            <React.Fragment>
                <div onClick={this.goBack} className="backdrop"/>

                {this.state &&
                <React.Fragment>
                    <div className="details">
                        <div onClick={this.goBack} className="details-close">✖</div>

                        <div className="details-container">
                            <div className="details-info">

                                <h1 className="details-info-name">{capitalize(this.state.pokémon.name)}</h1>
                                <div className="details-info-profile">
                                    <h2>Profile</h2>
                                    <dl>
                                        <dt><h4>Base Experience</h4></dt>
                                        <dd>{this.state.pokémon.base_experience} xp</dd>

                                        <dt><h4>Height</h4></dt>
                                        <dd>{this.state.pokémon.height / 10} m</dd>

                                        <dt><h4>Weight</h4></dt>
                                        <dd>{this.state.pokémon.weight / 10} kg</dd>
                                    </dl>
                                </div>
                                <div className="details-info-types">
                                    <h2>Types</h2>
                                    {this.state.pokémon.types.map((type) => {
                                        return <Link key={type.type.name} to={`/type/${type.type.name}`}
                                                style={{backgroundColor: typeToColor(type.type.name)}}
                                                className="details-info-types-type">{capitalize(type.type.name)}
                                        </Link>
                                    })}
                                </div>

                                <div className="details-info-stats">
                                    <h2>Stats</h2>
                                    {
                                        this.state.pokémon.stats.map((stat) => {
                                            return <div className="details-info-stats-stat" key={stat.stat.name}>
                                                {capitalize(stat.stat.name)}
                                                <div style={{
                                                    width: `${stat.base_stat}px`,
                                                    backgroundColor: typeToColor(this.state.pokémon.types[0].type.name)
                                                }}>
                                                    {stat.base_stat}</div>
                                            </div>
                                        })}

                                </div>
                            </div>
                            <div className="details-image">

                                <div id="flip-box">
                                    <div id="flip-box-inner">
                                        <div id="flip-box-front">
                                            <img alt="Pokemon front" src={this.state.pokémon.sprites.front_default}/>
                                        </div>
                                        <div id="flip-box-back">
                                            <img alt="Pokemon back" src={this.state.pokémon.sprites.back_default}/>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={this.toggleImage} className="button">↻</button>
                            </div>
                        </div>
                    </div>
                    {this.props.match.path === "/random" &&
                    <div className="button button-random" onClick={this.loadRandomPokémon}>Next →</div>}
                </React.Fragment>
                }
            </React.Fragment>
        );
    }

    componentDidMount = () => {
        if (this.props.match.params.pokemonName) {
            this.loadPokémon()
        } else if (this.props.match.path === "/random") {
            this.loadRandomPokémon()
        }
    }

    loadPokémon = () => {
        PokémonService.getPokémon(this.props.match.params.pokemonName).then(json => {
            this.setState({pokémon: json});
        });
    }

    loadRandomPokémon = () => {
        PokémonService.getRandomPokémon().then(json => {
            this.setState({pokémon: json});
        });
    }

    toggleImage = () => {
        document.getElementById('flip-box').classList.toggle('active');
    }

    goBack = () => {
        this.props.history.goBack()
    }
}

export default withRouter(PokémonDetails);
