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
            <div className="pokémons">
                <div className="pokémons-header">
                    <h1>{this.state.title}</h1>
                    <div onClick={this.sort} className="button button-sort">Sort ⇕</div>
                </div>
                <ul className="pokémons-list">
                    {this.state.jsonData.results[0] &&
                    this.state.jsonData.results.map((e, i) => {
                        return <li className="pokémons-item" key={i}>
                            <Link to={`/types/${this.props.match.params.type}/pokémon/${e.name}`}><PokémonItem pokémonRef={e}/></Link>
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
            if ((!!this.props.match.params.pokemonName || prevProps.match.params.pokemonName) &&
                (this.props.match.params.type === prevProps.match.params.type)) { return; } // Don't update data when coming from or going to detail page and type param hasn't changed
            this.initData();
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
            this.setState({jsonData: json});
            Loader.hideLoader();
        });
    }

    sort = () => {
        this.setState({state: this.state.jsonData.results.reverse()});
    }
}

export default TypePokémons;
