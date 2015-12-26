import React from 'react';
import $ from 'jquery';

import helpers from '../helpers/helpers';

import Entry from './Entry';

var Pokedex = React.createClass({

  getInitialState: function() {
    return {
      entries: {}
    };
  },

  componentDidMount: function() {

    if (this.isMounted()) {
      $.get('http://pokeapi.co/api/v1/pokedex/1/', function (data) {
        var pokelist = data.pokemon.sort(helpers.order);
        this.setState({entries: pokelist});
      }.bind(this));
    }
  },

  renderEntry: function(key) {
    return (
      <Entry key={key} index={key} details={this.state.entries[key]} replacePokemon={this.props.replacePokemon} />
    )
  },

  render: function() {
    return (
      <div className="pokedex">
        <h3>Pokedex</h3>
        <ul className="pokedexList">
          {Object.keys(this.state.entries).map(this.renderEntry)}
        </ul>
      </div>
    )
  }
});

export default Pokedex;