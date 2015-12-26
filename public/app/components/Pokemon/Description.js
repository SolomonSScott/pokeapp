import React from 'react';
import $ from 'jquery';

import helpers from '../../helpers/helpers';

var Description = React.createClass({

  getInitialState: function() {
    return {
      desc: '',
      gameTitle: ''
    };
  },

  componentDidMount: function() {
    if (this.isMounted()) {
      $.get('http://pokeapi.co' + this.props.description , function (data) {
        var title = [], i;
        for (i = 0; i < data.games.length; i++) {
          title.push(helpers.addSpace(data.games[i].name));
        }

        this.setState({
          desc: data.description,
          gameTitle: title
        });
      }.bind(this));
    }
  },

  componentWillReceiveProps: function() {
    if (this.isMounted()) {
      $.get('http://pokeapi.co' + this.props.description , function (data) {
        var title = [], i;
        for (i = 0; i < data.games.length; i++) {
          title.push(helpers.addSpace(data.games[i].name));
        }

        this.setState({
          desc: data.description,
          gameTitle: title
        });
      }.bind(this));
    }
  },

  _titles: function(key) {
    return <span className="game">{this.state.gameTitle[key]}</span>
  },

  render: function() {
    return (
      <div className="desc">
        <div className="games">
          {Object.keys(this.state.gameTitle).map(this._titles)}
        </div>
        <div className="description">{this.state.desc}</div>
      </div>

    )
  }
});

export default Description;