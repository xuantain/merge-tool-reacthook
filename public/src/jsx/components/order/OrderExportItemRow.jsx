'use strict';

var OrderActions = require('./../../actions/OrderActions');
var React = require('react');

module.exports = React.createClass({

  render: function() {
    var rowData = this.props.rowData;
    return (
      <tr>
        <td>{this.props.index + 1}</td>
        <td>{rowData.categoryName}</td>
        <td>{rowData.productName}</td>
        <td>{this._formatCurrency(rowData.quantity)}</td>
        <td>{this._formatCurrency(rowData.price)}</td>
        <td>{this._formatCurrency(rowData.amount)}</td>
        <td>{rowData.discount}</td>
        <td>{rowData.note}</td>
        <td><a href='#' onClick={this._pullOrderItem}>delete</a></td>
      </tr>
    )
  },

  _pullOrderItem: function(e) {
    e.preventDefault();
    OrderActions.removeOrderItem(this.props.index);
  },

  _formatCurrency: function (number) {
    number = number ? number : 0;
    return parseInt(number).toLocaleString('en-IN', { maximumSignificantDigits: 3 });
  }

});
