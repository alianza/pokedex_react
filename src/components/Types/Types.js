import React, {Component} from 'react';
import './Types.scss'
import PokémonService from "../../helpers/services/PokémonService";
import TypeItem from "./TypeItem/TypeItem";
import Loader from "../../helpers/Loader";
import {Link} from "react-router-dom";
import scrollToTop from "../../helpers/ScrollToTop";

class Types extends Component {
    render() {
        return (
            <div className="types">
                <div className="types-header">
                    <h1>Choose a Type!</h1>
                    <div onClick={this.sort} className="button button-sort">Sort ⇕</div>
                </div>
                <ul className="types-list">
                    {this.state &&
                    this.state.jsonData.results.map((type) => {
                        return <li key={type.name} className="types-item">
                            <Link to={`/types/${type.name}`} onClick={scrollToTop}>
                                <TypeItem type={type}>{type.name}</TypeItem>
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this.loadTypes();
    }

    loadTypes = () => {
        Loader.showLoader();
        PokémonService.getTypes().then(json => {
            this.setState({jsonData: json});
            Loader.hideLoader();
        });
    }

    sort = () => {
        this.setState({state: this.state.jsonData.results.reverse()});
    }
}

export default Types;
