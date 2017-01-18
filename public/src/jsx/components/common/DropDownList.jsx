'use strict';

var React = require('react');

module.exports = React.createClass({
  propTypes: {
    dataList: React.PropTypes.array,
    onChangeData: React.PropTypes.func
  },
  getDefaultProps: function() {
    return {
      _key: 'key',
      _value: 'value',
      _class: ''
    };
  },
  onChangeData: function(e) {
    e.preventDefault();
    var value = e.target.value;
    this.props.onChangeData(value);
  },
  render: function() {
    var props = this.props;
    var propKey = props._key;
    var propValue = props._value;
    return (
      <select className={'form-control '+ props._class} id={props._ref}
              name={props._ref} value={props.value} onChange={this.onChangeData}>
      {
        props.dataList.map(function(data) {
          return (
            <option key={'opt-'+ data[propKey] + propKey} value={data[propKey]}>
              {data[propValue]}
            </option>
          );
        })
      }
      </select>
    );
  }
});
