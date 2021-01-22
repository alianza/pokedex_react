import './PokéHeader.css'
import React from "react";

function PokéHeader(props) {
    return (
        <div className="header">
            <div onClick={e => props.onMenuClick(e)} className="menu-icon">
                <div/>
                <div/>
                <div/>
            </div>
            <h1 className="header-title">{props.title}</h1>
        </div>
    );
}

export default PokéHeader;
