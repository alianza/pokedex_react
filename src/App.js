import './App.scss';
import React from "react";
import PokéHeader from "./PokéHeader/PokéHeader";
import PokéMenu from "./PokéMenu/PokéMenu";
import PokéFooter from "./PokéFooter/PokéFooter";
import PokémonDetails from "./PokémonDetails/PokémonDetails";
import PokémonService from "./PokémonService/PokémonService";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Pokémons from "./Pokémons/Pokémons";
import Types from "./Types/Types";
import {Pokémon} from "./entity/Pokémon";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'PokéDex',
            jsonData: JSON,
            detailPokémon: Pokémon,
        }
    }

    render() {
        return (
            <Router>
                <div id="app" className="menu-active">
                    <PokéHeader onMenuClick={this.toggleMenu} title={this.state.title}/>
                    <PokéMenu onMenuClick={this.toggleMenu}/>

                    <div className={'content'}>

                        <Route exact={true} path={['/', '/pokémon/:pokemonName', '/random', '/type/:type']} render={({match}) => (
                            <Pokémons onPokémonClick={this.togglePokémonDetails} jsonData={this.state.jsonData} match={match}/>)}/>

                        <Route exact={true} path={'/types'} render={({match}) => (
                            <Types match={match}/>)}/>

                        {this.state.jsonData.previous &&
                        <button className="button button-prev" onClick={e => this.loadPreviousPage(e)}>Previous page</button>}

                        {this.state.jsonData.next &&
                        <button className="button button-next" onClick={e => this.loadNextPage(e)}>Next page</button>}
                    </div>

                    <div id="loader">
                        <div/>
                    </div>

                    <Route exact={true} path={['/random','/pokémon/:pokemonName']} render={({match}) => (
                        <PokémonDetails match={match}/>)}/>
                    <PokéFooter/>
                </div>
            </Router>
        );
    }

    componentDidMount = () => {
        window.addEventListener("resize", ev => {this.onResize(ev)})
    }

    toggleMenu = () => {
        document.getElementById("app").classList.toggle("menu-active");
    }

    onResize(ev) {
        if (ev.target.innerWidth < 600) {
            document.getElementById('app').classList.remove('menu-active')
        } else if (ev.target.innerWidth > 900) {
            document.getElementById('app').classList.add('menu-active')
        }
    }

    loadTypes = () => {
        PokémonService.loadTypes().then(json => {this.setState({jsonData: json});});
    }

    loadNextPage = () => {
        this.setState({jsonData: JSON})
        PokémonService.doLoad(this.state.jsonData.next).then(json => {this.setState({jsonData: json});});
    }

    loadPreviousPage = () => {
        this.setState({jsonData: JSON})
        PokémonService.doLoad(this.state.jsonData.previous).then(json => {this.setState({jsonData: json});});
    }

    togglePokémonDetails = (e, pokémon) => {
        console.log(e, pokémon);


    }
}

export default App;
