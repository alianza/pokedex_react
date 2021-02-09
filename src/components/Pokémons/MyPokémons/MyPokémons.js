import React, {Component} from 'react';
import './../Pokémons.scss'
import {Link} from "react-router-dom";
import CatchService from "../../../helpers/services/CatchService";
import MyPokémonItem from "../../PokémonItem/MyPokémonItem";

class MyPokémons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonData: {
                results: {}
            }
        }
    }

    render() {
        return (
            <div className="pokemons">
                <div className="pokemons-header">
                    <h1>My Pokémons!</h1>
                    <div onClick={this.sort} className="button button-sort">Sort ⇕</div>
                </div>
                <ul className="pokemons-list">
                    {this.state.jsonData.results[0] &&
                    this.state.jsonData.results.map((pokémon, i) => {
                        return <li className="pokemons-item" key={i}>
                            <Link to={`/my_pokémons/${pokémon.name}`}><MyPokémonItem pokémon={pokémon}/></Link>
                        </li>})}
                </ul>
                {!this.state.jsonData.results.length && <h2>No caught Pokémons yet...</h2>}
            </div>
        );
    }

    componentDidMount() {
        this.loadCaughtPokémons();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.props.match.params !== prevProps.match.params) {
            this.loadCaughtPokémons();
        }
    }

    loadCaughtPokémons() {
        let jsonData = { results: (CatchService.getAll() || '') }
        this.setState({jsonData: jsonData});
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

export default MyPokémons;
