import React, {Component} from 'react';

class PokémonDetails extends Component {
    render() {
        return (
            <div>
                <div onClick={'closeDialog'} class="backdrop"/>

                <div class="details">
                    <div onClick={"closeDialog()"} class="details-close">✖</div>

                    <div class="details-container">

                        <div class="details-info">
                            <h1 class="details-info-name">pokemon.name | capitalize</h1>
                            <div class="details-info-profile">
                                <h2>Profile</h2>
                                <dl>
                                    <dt><h4>Base Experience</h4></dt>
                                    <dd>pokemon.base_experience }} xp</dd>

                                    <dt><h4>Height</h4></dt>
                                    <dd>pokemon.height / 10 }} m</dd>

                                    <dt><h4>Weight</h4></dt>
                                    <dd>pokemon.weight / 10 }} kg</dd>
                                </dl>
                            </div>
                            <div class="details-info-types">
                                <h2>Types</h2>
                                <div class="details-info-types-type" onClick="onTypeClick(type.type)" key="type.type.name" for="type in pokemon.types"
                                style="{backgroundColor: $options.filters.typeToColor(type.type.name)}"> type.type.name | capitalize }}
                            </div>
                        </div>

                        <div class="details-info-stats">
                            <h2>Stats</h2>
                            <div class="details-info-stats-stat" key="stat.stat.name" for="stat in pokemon.stats">
                                stat.stat.name | capitalize }}
                                <div style="{width: stat.base_stat + 'px'}"> stat.base_stat }}</div>
                        </div>
                    </div>
                </div>
                <div class="details-image">

                    <div class="flip-box">
                        <div class="flip-box-inner">
                            <div class="flip-box-front">
                                <img alt="Pokemon image front" src="imageFront"/>
                            </div>
                            <div class="flip-box-back">
                                <img alt="Pokemon image back" src="imageBack"/>
                            </div>
                        </div>
                    </div>
                    {/*// <!--        <img alt="pokemon image" :src="image">-->*/}
                    <button if="!this.imageFront.includes('placeholder')" onClick="toggleImage()" class="button">↻</button>
                </div>
            </div>
    </div>
    </div>
        );
    }
}

export default PokémonDetails;
