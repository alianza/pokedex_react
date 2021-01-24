import './App.scss';
import React from "react";
import PokéHeader from "./PokéHeader/PokéHeader";
import PokéMenu from "./PokéMenu/PokéMenu";
import PokéFooter from "./PokéFooter/PokéFooter";
import PokémonDetails from "./PokémonDetails/PokémonDetails";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Pokémons from "./Pokémons/Pokémons";
import Types from "./Types/Types";
import {Pokémon} from "./entity/Pokémon";
import { AnimatedRoute } from 'react-router-transition';

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
                        <Switch>
                        <Route exact path={['/', '/pokémon/:pokemonName', '/random', '/type/:type']}  render={({match}) => (
                            <Pokémons jsonData={this.state.jsonData} match={match}/>)}/>

                        <Route path={'/types'} render={({match}) => (
                            <Types match={match}/>)}/>

                        <Route render={() => (<h1>404 Oops...</h1>)}/>
                        </Switch>
                    </div>

                    <div id="loader">
                        <div/>
                    </div>

                    <AnimatedRoute exact path={['/random','/pokémon/:pokemonName']}
                                   atEnter={{ opacity: 0 }} atLeave={{ opacity: 1 }} atActive={{ opacity: 1 }}
                                   mapStyles={(styles) => ({
                                       opacity: styles.opacity,
                                   })} render={({match}) => (
                        <PokémonDetails match={match}/>)}/>
                    <PokéFooter/>
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
            document.getElementById('app').classList.remove('menu-active')
        } else if (window.innerWidth > 900) {
            document.getElementById('app').classList.add('menu-active')
        }
    }
}

export default App;
