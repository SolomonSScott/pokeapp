import React from 'react';
import helpers from '../../helpers/helpers';

var NationalId = React.createClass({

  render: function() {
    return (
      <div className="pokedex-num">National № <span className="num">#{helpers.pad(this.props.id)}</span></div>
    )
  }
});

export default NationalId;