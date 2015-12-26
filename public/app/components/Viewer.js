import React from 'react';
import $ from 'jquery';

import Types from './Pokemon/Types';
import Ability from './Pokemon/Ability';
import NationalId from './Pokemon/NationalId';
import Height from './Pokemon/Height';
import Weight from './Pokemon/Weight';
import Description from './Pokemon/Description';

import helpers from '../helpers/helpers';

var Viewer = React.createClass({

  getInitialState: function() {
    return {
      viewPokemon: {}
    };
  },

  componentDidMount: function() {
    if (this.isMounted()) {
      $.get('http://pokeapi.co/api/v1/pokemon/' + this.props.pokemonId + '/' , function (data) {
         this.setState({
           viewPokemon: data,
         });
      }.bind(this));

    }
  },

  componentDidUpdate: function() {
    if (this.isMounted()) {
      $.get('http://pokeapi.co/api/v1/pokemon/' + this.props.pokemonId + '/' , function (data) {
        this.setState({
          viewPokemon: data,
        });
      }.bind(this));
    }
  },

  _showTypes: function(key) {
    return (
      <Types key={key} type={this.state.viewPokemon.types[key].name} />
    );
  },

  _abilities: function(key) {
    return <Ability key={key} ability={this.state.viewPokemon.abilities[key].name} />
  },

  _descriptions: function(key) {
    return <Description key={key} description={this.state.viewPokemon.descriptions[key].resource_uri} />
  },

  _getAttr: function(attr, func) {
    if(attr) {
      return Object.keys(attr).map(func);
    }
    else {
      return "";
    }
  },

  render: function() {
    return (
      <div className="pokeInfo">
        <h2>{helpers.addSpace(this.state.viewPokemon.name)}</h2>
        <div className="pokeright">
          <div className="pokeimg">
            <img src={helpers.pokeimg(String(this.state.viewPokemon.name).toLowerCase())} alt={this.state.viewPokemon.name} />
          </div>
          <div className="basic-info">
            <NationalId id={this.state.viewPokemon.national_id} />
            <div className="types">
              {this._getAttr(this.state.viewPokemon.types, this._showTypes)}
            </div>
            <div className="abilities">
              <h5>Abilities</h5>
              {this._getAttr(this.state.viewPokemon.abilities, this._abilities)}
            </div>
            <div className="small-row">
              <Height height={this.state.viewPokemon.height} />
              <Weight weight={this.state.viewPokemon.weight} />
            </div>
          </div>
        </div>

        <div className="pokeleft">
          <div className="descriptions">
            {this._getAttr(this.state.viewPokemon.descriptions, this._descriptions)}
          </div>
        </div>
      </div>
    )
  }
});

export default Viewer;