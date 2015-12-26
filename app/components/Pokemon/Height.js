import React from 'react';

import helpers from '../../helpers/helpers';

var Height = React.createClass({

  render: function() {
    return (
      <div className="height half">
        <h5>Height</h5>
        {helpers.calculateHeight(this.props.height)} meters
      </div>
    )
  }
});

export default Height;