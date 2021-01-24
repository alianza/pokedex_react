import './PokéMenu.scss'
import React from "react";
import {NavLink} from "react-router-dom";

class PokéMenu extends React.Component<{}> {
    render() {
        return (
            <div className="menu">
                <div onClick={e => this.props.onMenuClick(e)} className="menu-close">✖</div>
                <h1>Menu</h1>
                <ul className="menu-top">
                    <li><NavLink exact to={'/'} activeClassName={'active'}>Home</NavLink></li>
                    <li><NavLink to={'/types'} activeClassName={'active'}>Types</NavLink></li>
                    <li><NavLink exact to={'/random'} activeClassName={'active'}>Random Pokemon</NavLink></li>
                    <li data-item="about" onClick={this.about}>About</li>
                </ul>
                <p className="menu-bottom">Jan-Willem van Bremen</p>
            </div>
        );
    }

    about = () => {
        alert('This is a Web PokéDex Application!\n' +
            'Discover countless Pokemon and their info!\n' +
            'Made by Jan-Willem van Bremen - 2020')
    }
}

export default PokéMenu;
