import './PokéMenu.scss'
import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import scrollToTop from "../../helpers/ScrollToTop";

function PokéMenu(props) {
    const { pathname } = useLocation();

    const about = () => {
        alert('This is a Web PokéDex Application!\n' +
            'Discover countless Pokémon and their info!\n' +
            'Made by Jan-Willem van Bremen - 2020');
    }

    return (
        <div className="menu">
            <div onClick={e => props.onMenuClick(e)} className="menu-close">✖</div>
            <h1>Menu</h1>
            <ul className="menu-top">
                <li><NavLink to={'/'} isActive={ (match) => pathname.includes('/page') || match.url === '/'}
                             activeClassName={'active'} onClick={() => scrollToTop()}>Home</NavLink></li>
                <li><NavLink to={'/types'} isActive={ () => pathname.includes('/types') } activeClassName={'active'}>Types</NavLink></li>
                <li><NavLink exact to={'/my_pokémons'} isActive={ () => pathname.includes('/my_pokémons') }
                             activeClassName={'active'}>My Pokémons</NavLink></li>
                <li><NavLink exact to={'/random'} activeClassName={'active'}>Random Pokémon</NavLink></li>
                <li onClick={about}>About</li>
            </ul>
            <p className="menu-bottom">Jan-Willem van Bremen</p>
        </div>
    );
}

export default PokéMenu;
