import './PokéMenu.scss'
import React from "react";
import {Link} from "react-router-dom";

class PokéMenu extends React.Component<{}> {
    render() {
        return (
            <div className="menu">
                <div onClick={e => this.props.onMenuClick(e)} className="menu-close">✖</div>
                <h1>Menu</h1>
                <ul className="menu-top">
                    <li className="active"><Link to={'/'} onClick={this.setActiveMenuItem}>Home</Link></li>
                    <li><Link to={'/types'} onClick={this.setActiveMenuItem}>Types</Link></li>
                    <li><Link to={'/random'} onClick={this.setActiveMenuItem}>Random Pokemon</Link></li>
                    <li data-item="about" onClick={this.about}>About</li>
                </ul>
                <p className="menu-bottom">Jan-Willem van Bremen</p>
            </div>
        );
    }

    setActiveMenuItem(e) {
        document.getElementsByClassName('active')[0].classList.remove('active');
        e.target.parentElement.classList.add('active');
    }
    
    about = () => {
        alert('This is a Web PokéDex Application!\n' +
            'Discover countless Pokemon and their info!\n' +
            'Made by Jan-Willem van Bremen - 2020')
    }
}

export default PokéMenu;
