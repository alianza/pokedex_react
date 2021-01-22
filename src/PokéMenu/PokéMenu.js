import './PokéMenu.css'
import React from "react";

function PokéMenu(props) {
    return (
        <div className="menu">
            <div onClick={e => props.onMenuClick(e)} className="menu-close">✖</div>
            <h1>Menu</h1>
            <ul className="menu-top">
                <li data-item="home" onClick={e => props.onMenuItemClick(e)} className="active">Home</li>
                <li data-item="types" onClick={e => props.onMenuItemClick(e)}>Types</li>
                <li data-item="random" onClick={e => props.onMenuItemClick(e)}>Random Pokemon</li>
                <li data-item="about" onClick={e => props.onMenuItemClick(e)}>About</li>
            </ul>
            <p className="menu-bottom">Jan-Willem van Bremen</p>
        </div>
    );
}

export default PokéMenu;
