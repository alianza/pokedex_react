import React, {Component} from 'react';
import './../Pokémons.scss'
import PokémonItem from "../../PokémonItem/PokémonItem";
import { Link } from "react-router-dom";
import PokémonService from "../../../helpers/services/PokémonService";
import scrollToTop from "../../../helpers/ScrollToTop";
import Loader from "../../../helpers/Loader";

class AllPokémons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jsonData: {
                results: {}
            },
            page: 1,
        }
    }

    render() {
        return (
            <div className="pokémons">
                <div className="pokémons-header">
                    <h1>Pick a creature!</h1>
                    {this.state.jsonData.results.length > 1 && <div onClick={this.sort} className="button button-sort">Sort ⇕</div>}
                </div>
                <ul className="pokémons-list">
                    {this.state.jsonData.results[0] &&
                    this.state.jsonData.results.map((e, i) => {
                        return <li className="pokémons-item" key={i}>
                            <Link to={`/pokémon/${e.name}`}><PokémonItem pokémonRef={e}/></Link>
                        </li>})}
                </ul>
                {!this.state.jsonData.results.length && <h2>No results :(</h2>}

                {this.state && this.state.jsonData.previous &&
                <Link to={`/page/${this.state.page - 1}`} className="button button-prev" onClick={() => this.loadPreviousPage()}>Previous page</Link>}

                {this.state && this.state.jsonData.next &&
                <Link to={`/page/${this.state.page + 1}`} className="button button-next" onClick={() => this.loadNextPage()}>Next page</Link>}
            </div>
        );
    }

    componentDidMount() {
        this.initData();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (this.props.match.params !== prevProps.match.params) {
            if ((this.props.match.params.pokemonName && !prevProps.match.params.pokemonName) || this.props.match.path === "/random") {
                return; // Don't initiate data if pokémon is detailed OR when random pokemon is detailed OR when pagination is used
            }
            if (!!this.props.match.params.pokemonName || prevProps.match.params.pokemonName) { return; } // Don't update data when coming from or going to detail page
            this.initData();
        }
    }

    initData = () => {
         if (this.props.match.params.page) { // Page to load is set, load paged pokémons from that page
            this.setState({ page: parseInt(this.props.match.params.page) });
            let offset = (this.props.match.params.page - 1) * PokémonService.basePageLimit;
            this.loadPagedPokémon(offset);
        } else { // Default case, load normal pokémon list
            this.loadPokémons();
        }
    }

    loadPokémons = () => {
        Loader.showLoader();
        PokémonService.getPokémons().then(json => {
            this.setState({jsonData: json});
            Loader.hideLoader();
        });
    }

    loadPagedPokémon = (offset) => {
        Loader.showLoader();
        PokémonService.getPagedPokémons(offset).then(json => {
            this.setState({jsonData: json});
            Loader.hideLoader();
        })
    }

    loadNextPage = () => {
        Loader.showLoader();
        this.setState({ page: this.state.page + 1 })
        PokémonService.doLoad(this.state.jsonData.next).then(json => {
            this.setState({jsonData: json});
            Loader.hideLoader();
            scrollToTop();
        });
    }

    loadPreviousPage = () => {
        Loader.showLoader();
        this.setState({ page: this.state.page - 1 })
        PokémonService.doLoad(this.state.jsonData.previous).then(json => {
            this.setState({jsonData: json});
            Loader.hideLoader();
            scrollToTop();
        });
    }

    sort = () => {
        this.setState({state: this.state.jsonData.results.reverse()});
    }
}

export default AllPokémons;
