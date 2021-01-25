import './TypeItem.scss'
import React from "react";
import capitalize from "../../../helpers/Capitalize";
import typeToColor from "../../../helpers/TypeToColor";
import {Link} from "react-router-dom";
import scrollToTop from "../../../helpers/ScrollToTop";

function TypeItem(props) {
    return (
        <Link to={`/type/${props.type.name}`} onClick={scrollToTop}>
            <div className="type">
                <div className="type-container" style={{backgroundColor: typeToColor(props.type.name)}}>
                    <h3 className="type-name">{capitalize(props.type.name)}</h3>
                </div>
            </div>
        </Link>
    );
}

export default TypeItem;
