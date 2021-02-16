import './PokémonDetails.scss'
import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import PokémonService from "../../helpers/services/PokémonService";
import capitalize from "../../helpers/Capitalize";
import typeToColor from "../../helpers/TypeToColor";
import {Pokémon} from "../../entity/Pokémon";
import Loader from "../../helpers/Loader";
import scrollToTop from "../../helpers/ScrollToTop";
import CatchService from "../../helpers/services/CatchService";
import pokéball_closed from "../../img/pokéball_closed.png"
import pokéball_open from "../../img/pokéball_open.png"

class PokémonDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokémon: new Pokémon(),
            caught: false,
        }
    }

    render() {
        return (
            <React.Fragment>
                <div onClick={this.goBack} className="backdrop"/>

    {this.state.pokémon.name &&
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
                                return <Link onClick={() => {this.enableBodyScroll(true); scrollToTop()}}
                                        key={type.type.name} to={`/type/${type.type.name}`}
                                        style={{backgroundColor: typeToColor(type.type.name)}}
                                        className="details-info-types-type">{capitalize(type.type.name)}</Link>})}
                        </div>
                        <div className="details-info-stats">
                            <h2>Stats</h2>
                            {this.state.pokémon.stats.map((stat) => {
                                return <div className="details-info-stats-stat" key={stat.stat.name}>
                                    {capitalize(stat.stat.name)}
                                    <div style={{
                                      width: `${stat.base_stat}px`,
                                      backgroundColor: typeToColor(this.state.pokémon.types[0].type.name)}}>{stat.base_stat}</div>
                                </div>})}
                        </div>
                    </div>
                    <div className="details-image">
                        <div id="flip-box" className={!this.state.pokémon.sprites.back_default ? 'disabled' : ''}>
                            <div id="flip-box-inner">
                                <div id="flip-box-front">
                                    <img alt="Pokemon front" src={this.state.pokémon.sprites.front_default || pokéball_closed}/>
                                </div>
{this.state.pokémon.sprites.back_default && <div id="flip-box-back">
                                                <img alt="Pokemon back" src={this.state.pokémon.sprites.back_default}/>
                                            </div>}
                            </div>
                        </div>
{this.state.pokémon.sprites.back_default && <button onClick={this.toggleImage} className="button">↻</button>}
                    </div>
                </div>
            </div>
{this.props.match.path === "/random" && <div className="button button-random" onClick={this.loadRandomPokémon}>Next →</div>}

            <div className="button button-catch tooltip"
                 data-tip={this.state.caught ? `Let ${capitalize(this.state.pokémon.name)} go!` : `Catch ${capitalize(this.state.pokémon.name)}!`}
                 style={{backgroundImage: `url( ${this.state.caught ? pokéball_closed : pokéball_open} )`}} onClick={this.catchPokémon}/>

        </React.Fragment>
                }
            </React.Fragment>
        );
    }

    componentDidMount = () => {
        if (this.props.match.params.pokemonName) {
            this.loadPokémon();
        } else if (this.props.match.path === "/random") {
            this.loadRandomPokémon();
        }
        this.enableBodyScroll(false);
    }

    componentWillUnmount() {
        this.enableBodyScroll(true);
    }

    loadPokémon = () => {
        Loader.showLoader();
        PokémonService.getPokémon(this.props.match.params.pokemonName).then(json => {
            if (json) {
                this.setState({pokémon: json});
                this.updateCaughtState();
                Loader.hideLoader();
            }
        });
    }

    loadRandomPokémon = () => {
        Loader.showLoader();
        PokémonService.getRandomPokémon().then(json => {
            this.setState({pokémon: json});
            this.updateCaughtState();
            Loader.hideLoader();
        });
    }

    catchPokémon = () => {
        if (this.state.caught) {
            CatchService.remove(this.state.pokémon.name);
            this.setState({caught: false});
        } else {
            CatchService.add(this.state.pokémon);
            this.setState({caught: true});
        }
    }

    updateCaughtState = () => {
        this.setState({caught: !!CatchService.get(this.state.pokémon.name)});
    }

    toggleImage = () => {
        document.getElementById('flip-box').classList.toggle('active');
    }

    goBack = () => {
        this.enableBodyScroll(true);
        this.props.history.goBack();
        this.goBack = () => {} // Allow goBack() to be called only once
    }

    enableBodyScroll = (enable) => {
        if (enable) { document.body.classList.remove('scroll_disabled');
        } else { document.body.classList.add('scroll_disabled'); }
    }
}

export default withRouter(PokémonDetails);
