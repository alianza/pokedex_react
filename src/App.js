import './App.scss';
import React from "react";
import PokéHeader from "./PokéHeader/PokéHeader";
import PokéMenu from "./PokéMenu/PokéMenu";
import PokéFooter from "./PokéFooter/PokéFooter";
import PokémonDetails from "./PokémonDetails/PokémonDetails";
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
                            <Pokémons jsonData={this.state.jsonData} match={match}/>)}/>

                        <Route exact={true} path={'/types'} render={({match}) => (
                            <Types match={match}/>)}/>
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
}

export default App;

// const AppWithRouter = withRouter(App)
