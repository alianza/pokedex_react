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
                results: { }
            }
        }
    }

    render() {
        return (
            <div className="pokémons">
                <div className="pokémons-header">
                    <h1>My Pokémons!</h1>
                    {this.state.jsonData.results.length > 1 && <div onClick={this.sort} className="button button-sort">Sort ⇕</div>}
                </div>
                <ul className="pokémons-list">
                    {this.state.jsonData.results[0] &&
                    this.state.jsonData.results.map((pokémon, i) => {
                        return <li className="pokémons-item" key={i}>
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
        this.setState({ jsonData: jsonData } )
    }

    sort = () => {
        this.setState({ state: this.state.jsonData.results.reverse() });
    }
}

export default MyPokémons;
