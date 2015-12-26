import React from 'react';

var Types = React.createClass({

  render: function() {
    return (
      <div className={this.props.type + ' type'}>
        <span >{this.props.type}</span>
      </div>
    )
  }
});

export default Types;