import React from 'react';

import Sprite from './Pokemon/Sprite';
import helpers from '../helpers/helpers';

var Entry = React.createClass({

  showPokemon: function() {
    this.props.replacePokemon(helpers.getpokeID(this.props.details.resource_uri));
  },

  render: function() {
    return (
      <li className="entry" onClick={this.showPokemon} ref={helpers.getpokeID(this.props.details.resource_uri)}>
        <div className="entryImg">
          <Sprite id={helpers.getpokeID(this.props.details.resource_uri)} name={this.props.details.name} />
        </div>
        <span className="entryName">
          {helpers.addSpace(this.props.details.name)}
        </span>
      </li>
    )
  }
});

export default Entry;