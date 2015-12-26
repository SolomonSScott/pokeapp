import React from 'react';

import helpers from '../../helpers/helpers';

var Weight = React.createClass({

  render: function() {
    return (
      <div className="weight half">
        <h5>Weight</h5>
        {helpers.calculateHeight(this.props.weight)} kg
      </div>
    )
  }
});

export default Weight;