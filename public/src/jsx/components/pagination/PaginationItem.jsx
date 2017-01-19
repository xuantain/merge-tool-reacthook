'use strict';

var React = require('react');

var PaginationItem = React.createClass({
  changeValue: function(e) {
    e.preventDefault();
    this.props.moveToPage(this.props.page);
  },
  remainingClassName: function() {
    return this.props.currentPage === this.props.page ? 'active' : '';
  },
  render: function() {
    return (
      <li className={'paginate_button '+ this.remainingClassName()}>
        <a href='' onClick={this.changeValue}>{this.props.page}</a>
      </li>
    );
  }
});

module.exports = PaginationItem;
