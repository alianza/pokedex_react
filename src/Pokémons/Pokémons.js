import React, {Component} from 'react';
import './Pokémons.scss'
import PokémonItem from "./PokémonItem/PokémonItem";
import {Link} from "react-router-dom";
import PokémonService from "../PokémonService/PokémonService";
import capitalize from "../helpers/Capitalize";

class Pokémons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonData: {
                results: {}
            },
            title: "Pick a creature!",
        }
    }

    render() {
        return (
            <div className="pokemons">
                <div className="pokemons-header">
                    <h1>{this.state.title}</h1>
                    <div onClick={this.sort} className="button button-sort">Sort ⇕</div>
                </div>
                <ul className="pokemons-list">
                    {this.state.jsonData.results[0] &&
                    this.state.jsonData.results.map((e, i) => {
                        return <li className="pokemons-item" key={i}>
                            <Link to={`/pokémon/${e.name}`}><PokémonItem pokémonRef={e}/></Link>
                        </li>})}
                </ul>
                {!this.state.jsonData.results.length && <h2>No results :(</h2>}

                {this.state && this.state.jsonData.previous &&
                <button className="button button-prev" onClick={e => this.loadPreviousPage(e)}>Previous page</button>}

                {this.state && this.state.jsonData.next &&
                <button className="button button-next" onClick={e => this.loadNextPage(e)}>Next page</button>}
            </div>
        );
    }

    componentDidMount() {
        this.initData()
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.props.match.params !== prevProps.match.params) {
            if (this.props.match.params.pokemonName && !prevProps.match.params.pokemonName) {
                return; // Don't update data if pokémon is detailed
            }
            if (this.props.match.path === "/random") {
                return; // Don't update data when random pokémon is detailed
            }
            if (this.props.match.path === "/" && !prevProps.match.path.includes('/type')) {
                return; // Don't update data already on homepage except when coming from type
            }
            this.initData()
        }
    }

    initData = () => {
        if (this.props.match.params.type) {
            this.setState({title: `${capitalize(this.props.match.params.type)} type Pokémon!`})
            this.loadTypePokémons(this.props.match.params.type)
        } else {
            this.setState({title: "Pick a creature!"})
            this.loadPokémons()
        }
    }

    loadPokémons = () => {
        PokémonService.getPokemons().then(json => {
            this.setState({jsonData: json});
        });
    }

    loadTypePokémons = (type) => {
        PokémonService.getTypePokémons(type).then(json => {
            if (json) {
                Object.defineProperty(json, 'results', Object.getOwnPropertyDescriptor(json, 'pokemon'));
                delete json['pokemon']; // Change name of pokemons prop to results
                json.results.forEach(function (result, index) {
                    json.results[index] = result.pokemon // Lift all pokemons results one level up in hierarchy
                })
                this.setState({jsonData: json});
            }
        });
    }

    loadNextPage = () => {
        this.setState({})
        PokémonService.doLoad(this.state.jsonData.next).then(json => {
            this.setState({jsonData: json});
            this.scrollToTop();
        });
    }

    loadPreviousPage = () => {
        this.setState({})
        PokémonService.doLoad(this.state.jsonData.previous).then(json => {
            this.setState({jsonData: json});
            this.scrollToTop();
        });
    }

    sort = () => {
        let list = document.getElementsByClassName('pokemons-list')[0]
        let children = list.children
        children = [...children].reverse()
        list.innerHTML = ''
        children.forEach(function (result) {
            list.innerHTML += result.outerHTML;
        })
    }

    scrollToTop = () => {
        const position = document.body.scrollTop || document.documentElement.scrollTop;
        if (position) {
            window.scrollBy(0, -Math.max(10, Math.floor(position / 10)));
            requestAnimationFrame(this.scrollToTop);
        }
    }
}

export default Pokémons;
