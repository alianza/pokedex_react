import React, {Component} from 'react';
import './Types.scss'
import PokémonService from "../PokémonService/PokémonService";
import TypeItem from "./TypeItem/TypeItem";

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
                            <TypeItem type={type}>{type.name}</TypeItem>
                        </li>
                    })}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this.loadTypes()
    }

    loadTypes = () => {
        PokémonService.getTypes().then(json => {
            this.setState({jsonData: json});
        });
    }

    sort = () => {
        let list = document.getElementsByClassName('types-list')[0]
        let children = list.children
        children = [...children].reverse()
        list.innerHTML = ''
        children.forEach(function (result) {
            list.innerHTML += result.outerHTML;
        })
    }
}

export default Types;
