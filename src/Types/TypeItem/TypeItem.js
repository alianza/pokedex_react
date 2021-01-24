import './TypeItem.scss'
import React, {Component} from "react";
import capitalize from "../../helpers/Capitalize";
import typeToColor from "../../helpers/TypeToColor";
import {Link} from "react-router-dom";

class TypeItem extends Component {
    render() {
        return (
            <Link to={`/type/${this.props.type.name}`}>
                <div className="type">
                    <div className="type-container" style={{backgroundColor: typeToColor(this.props.type.name)}}>
                        <h3 className="type-name">{capitalize(this.props.type.name)}</h3>
                    </div>
                </div>
            </Link>
        );
    }
}

export default TypeItem;
