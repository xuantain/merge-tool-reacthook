'use strict';

var React = require('react'),
    PaginationItem = require('./../components/PaginationItem');

module.exports = React.createClass({
  render: function() {
    var items = [];
    for (var i = 1; i <= this.props.pages; i++) {
      items.push( <PaginationItem key={'page-'+ i} page={i} {...this.props}/> );
    }
    return (
      <div className='text-center'>
        <ul className='pagination'>
          { items }
        </ul>
      </div>
    );
  }
});
