'use strict';

var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      type: 'text',
      valueLink: '',
      styleClass: '',
      placeholder: 'text here'
    };
  },
  render: function() {
    return (
      <div className={'input-group col-xs-6 col-sm-6 '+this.props.styleClass}>
        <span className='input-group-addon'>{this.props.title}</span>
        <input id={this.props._ref}
              ref={this.props._ref}
              name={this.props._ref}
              className='form-control'
              type={this.props.type}
              valueLink={this.props.valueLink}
              placeholder={this.props.placeholder}/>
      </div>
    );
  }
});
