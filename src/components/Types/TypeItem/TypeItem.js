import './TypeItem.scss'
import React from "react";
import capitalize from "../../../helpers/Capitalize";
import typeToColor from "../../../helpers/TypeToColor";

function TypeItem(props) {
    return (
        <div className="type">
            <div className="type-container" style={{backgroundColor: typeToColor(props.type.name)}}>
                <h3 className="type-name">{capitalize(props.type.name)}</h3>
            </div>
        </div>
    );
}

export default TypeItem;
