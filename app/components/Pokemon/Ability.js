import React from 'react';

import helpers from '../../helpers/helpers';

var Ability = React.createClass({

  render: function() {
    return (
      <div className={this.props.ability + ' ability'}>
        <span>{helpers.addSpace(this.props.ability)}</span>
      </div>
    )
  }
});

export default Ability;