import React, {Component} from 'react';
import './../Pokémons.scss'
import PokémonItem from "../../PokémonItem/PokémonItem";
import {Link} from "react-router-dom";
import PokémonService from "../../../helpers/services/PokémonService";
import capitalize from "../../../helpers/Capitalize";
import Loader from "../../../helpers/Loader";

class TypePokémons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonData: {
                results: {}
            },
            title: "... Type pokémon",
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
                            <Link to={`/type/${this.props.match.params.type}/pokémon/${e.name}`}><PokémonItem pokémonRef={e}/></Link>
                        </li>})}
                </ul>
                {!this.state.jsonData.results.length && <h2>No results :(</h2>}
            </div>
        );
    }

    componentDidMount() {
        this.initData();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.props.match.params !== prevProps.match.params) {
            this.initData()
        }
    }

    initData = () => {
        if (this.props.match.params.type) { // Type to load is set, load pokémons from that type
            this.setState({title: `${capitalize(this.props.match.params.type)} type Pokémon!`});
            this.loadTypePokémons(this.props.match.params.type);
        }
    }

    loadTypePokémons = (type) => {
        Loader.showLoader();
        PokémonService.getTypePokémons(type).then(json => {
            if (json) {
                Object.defineProperty(json, 'results', Object.getOwnPropertyDescriptor(json, 'pokemon'));
                delete json['pokemon']; // Change name of pokemons prop to results
                json.results.forEach(function (result, index) {
                    json.results[index] = result.pokemon; // Lift all pokemons results one level up in hierarchy
                })
                this.setState({jsonData: json});
                Loader.hideLoader();
            }
        });
    }

    sort = () => {
        let list = document.getElementsByClassName('pokemons-list')[0]
        let children = list.children;
        children = [...children].reverse();
        list.innerHTML = '';
        children.forEach(function (result) {
            list.innerHTML += result.outerHTML;
        })
    }
}

export default TypePokémons;
