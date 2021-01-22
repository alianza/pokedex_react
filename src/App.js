import './App.scss';
import React from "react";
import PokéHeader from "./PokéHeader/PokéHeader";
import PokéMenu from "./PokéMenu/PokéMenu";
import PokéService from "./PokéService/PokéService";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'PokéDex',
            jsonData: [],

        }
    }
    render() {
        return (
            <div id="app" className="menu-active">
                <PokéHeader onMenuClick={e => this.toggleMenu(e)} title={this.state.title}/>
                <PokéMenu onMenuClick={e => this.toggleMenu(e)} onMenuItemClick={e => this.onMenuItemClick(e)}/>


            </div>
        );
    }
    componentDidMount() {
        this.loadPokemons();
    }
    toggleMenu(e) {
        console.log("Menu Clicked!");
        console.log(e);
        document.getElementById("app").classList.toggle("menu-active");
    }
    onMenuItemClick(e) {
        switch (e.target.dataset.item) {
            case 'home': { this.setState({jsonData: []}); this.loadPokemons(); this.setActiveMenuItem(e); break }
            case 'types': { this.loadTypes(); this.setActiveMenuItem(e); break }
            case 'random': { this.loadRandomPokemon(); break }
            case 'about': { this.about(); break }
            default : {return}}
    }
    setActiveMenuItem(e) {
        document.getElementsByClassName('active').item(0).classList.remove('active');
        e.target.classList.add('active');
    }
    about() {
        alert('This is a Web PokéDex Application!\n' +
            'Discover countless Pokemon and their info!\n' +
            'Made by Jan-Willem van Bremen - 2020')
    }
    loadPokemons() {
        PokéService.loadPokemons().then(json => {console.log(json)})
    }
}

export default App;
