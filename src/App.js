import './App.scss';
import React from "react";
import PokéHeader from "./components/PokéHeader/PokéHeader";
import PokéMenu from "./components/PokéMenu/PokéMenu";
import PokéFooter from "./components/PokéFooter/PokéFooter";
import PokémonDetails from "./components/PokémonDetails/PokémonDetails";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AllPokémons from "./components/Pokémons/AllPokémons/AllPokémons";
import Types from "./components/Types/Types";
import {Pokémon} from "./entity/Pokémon";
import { AnimatedRoute } from 'react-router-transition';
import TypePokémons from "./components/Pokémons/TypePokémons/TypePokémons";
import MyPokémons from "./components/Pokémons/MyPokémons/MyPokémons";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'PokéDex',
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
                        <Switch>
                            <Route exact path={['/', '/pokémon/:pokemonName', '/random', '/page/:page']} render={({match}) => (
                                <AllPokémons match={match}/>)}/>

                            <Route exact path={['/type/:type', '/type/:type/pokémon/:pokemonName']} render={({match}) => (
                                <TypePokémons match={match}/>)}/>

                            <Route path={'/types'} render={({match}) => (
                                <Types match={match}/>)}/>

                            <Route exact path={['/my_pokémons', '/my_pokémons/:pokemonName']} render={({match}) => (
                                <MyPokémons match={match}/>)}/>

                            <Route render={() => (<h1>404 Oops...</h1>)}/>
                        </Switch>
                    </div>

                    <PokéFooter/>

                    <div id="loader">
                        <div/>
                    </div>

                    <AnimatedRoute exact path={['/random','/pokémon/:pokemonName', '/type/:type/pokémon/:pokemonName', '/my_pokémons/:pokemonName']}
                                   atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }}
                                   mapStyles={(styles) => ({ opacity: styles.opacity, })}
                                   render={({match}) => (<PokémonDetails match={match}/>)}/>
                </div>
            </Router>
        );
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.onResize); this.onResize();
    }

    toggleMenu = () => {
        document.getElementById("app").classList.toggle("menu-active");
    }

    onResize = () => {
        if (window.innerWidth < 600) {
            document.getElementById('app').classList.remove('menu-active');
        } else if (window.innerWidth > 900) {
            document.getElementById('app').classList.add('menu-active');
        }
    }
}

export default App;
