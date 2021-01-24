import './PokéMenu.scss'
import React from "react";
import {NavLink, useLocation} from "react-router-dom";

function PokéMenu() {
    const { pathname } = useLocation();

    const about = () => {
        alert('This is a Web PokéDex Application!\n' +
            'Discover countless Pokemon and their info!\n' +
            'Made by Jan-Willem van Bremen - 2020')
    }

    return (
            <div className="menu">
                <div onClick={e => this.props.onMenuClick(e)} className="menu-close">✖</div>
                <h1>Menu</h1>
                <ul className="menu-top">
                    <li><NavLink exact to={'/'} activeClassName={'active'}>Home</NavLink></li>
                    <li><NavLink to={'/types'}  isActive={ () => pathname.includes('/type') } activeClassName={'active'}>Types</NavLink></li>
                    <li><NavLink exact to={'/random'} activeClassName={'active'}>Random Pokemon</NavLink></li>
                    <li onClick={about}>About</li>
                </ul>
                <p className="menu-bottom">Jan-Willem van Bremen</p>
            </div>
        );
}

export default PokéMenu;
