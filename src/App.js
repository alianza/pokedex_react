import './App.scss';
import React from "react";
import PokéHeader from "./PokéHeader/PokéHeader";
import PokéMenu from "./PokéMenu/PokéMenu";
import PokéService from "./PokéService/PokéService";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Pokémons from "./Pokémons/Pokémons";
import Types from "./Types/Types";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'PokéDex',
            jsonData: JSON,
        }
    }

    render() {
        return (
            <Router>
                <div id="app" className="menu-active">
                    <PokéHeader onMenuClick={e => this.toggleMenu(e)} title={this.state.title}/>
                    <PokéMenu onMenuClick={e => this.toggleMenu(e)} onMenuItemClick={e => this.onMenuItemClick(e)}/>
                    <div className={'content'}>

                            <Route exact={true} path={'/'} render={({match}) => (
                                <Pokémons match={match} jsonData={this.state.jsonData}/>
                            )}/>

                            <Route exact={true} path={'/types'} render={({match}) => (
                                <Types match={match}/>
                            )}/>

                        {this.state.jsonData.previous && <button className="button button-prev" onClick={e => this.loadPreviousPage(e)}>Previous page</button>}
                        {this.state.jsonData.next && <button className="button button-next" onClick={e => this.loadNextPage(e)}>Next page</button>}
                    </div>
                </div>
            </Router>
        );
    }

    componentDidMount() {
        this.loadPokemons();
        window.addEventListener("resize", ev => {this.onResize(ev)})
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

    onResize(ev) {
        if (ev.target.innerWidth < 600) {
            document.getElementById('app').classList.remove('menu-active')
        } else if (ev.target.innerWidth > 900) {
            document.getElementById('app').classList.add('menu-active')
        }
    }

    about() {
        alert('This is a Web PokéDex Application!\n' +
            'Discover countless Pokemon and their info!\n' +
            'Made by Jan-Willem van Bremen - 2020')
    }

    loadPokemons() {
        PokéService.loadPokemons().then(json => {this.setState({jsonData: json});});
    }

    loadTypes() {
        PokéService.loadTypes().then(json => {this.setState({jsonData: json});});
    }

    loadNextPage() {
        console.log(this.state.jsonData.next)
        PokéService.doLoad(this.state.jsonData.next).then(json => {this.setState({jsonData: json});});
    }

    loadPreviousPage() {
        PokéService.doLoad(this.state.jsonData.previous).then(json => {this.setState({jsonData: json});});
    }
}

export default App;