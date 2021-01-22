import React, {Component} from 'react';
import './Types.scss'

class Types extends Component {
    render() {
        return (
            <div className="types">
                <div className="types-header">
                    <h1>Choose a Type!</h1>
                    <div className="button button-sort">Sort ⇕</div>
                </div>
                <ul className="types-list">
                    <li className="types-item">
                        awdawd
                        {/*<type-item @clickedType="clickedType" :type="type"></type-item>*/}
                </li>
            </ul>
    </div>
        );
    }
    componentDidMount() {
        console.log(this.props.match);
    }
}

export default Types;
