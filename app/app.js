import React from 'react';
import $ from 'jquery';

import Pokedex from './components/Pokedex';
import Viewer from './components/Viewer';

var App = React.createClass({

  getInitialState: function() {
    return {
      team: {},
      pokemon: "1"
    }
  },

  replacePokemon: function(id) {
    this.setState({pokemon: id});
  },

  render: function() {
    return (
      <div>
        <Pokedex replacePokemon={this.replacePokemon} />
        <div className="right">
          <Viewer pokemonId={this.state.pokemon} />
        </div>
      </div>
    )
  }
});

export default App;