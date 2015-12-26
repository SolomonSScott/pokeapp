import React from 'react';
import $ from 'jquery';

var Sprite = React.createClass({

  getInitialState: function() {
    return {
      src: '',
      alt: ''
    };
  },

  componentDidMount: function() {

    if (this.isMounted()) {
      this.setState({
        src: 'http://pokeapi.co/media/img/'+ this.props.id +'.png',
        alt: this.props.name
      });
    }
  },

  render: function() {
    return (
      <img src={this.state.src} alt={this.state.alt} />
    )
  }
});

export default Sprite;