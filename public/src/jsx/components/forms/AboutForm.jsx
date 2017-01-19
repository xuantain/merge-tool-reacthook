'use strict';

var React = require('react');

var AboutForm = React.createClass({
  render: function() {
    return (
      <div className='col-xs-12 col-sm-12'>
        <h3>Sales-manage application</h3>
        <div>
          <p>This is a demo application use NodeJS, expressJs, ReactJs, Mongoose and build tool Gulp.</p>
        </div>
      </div>
    )
  }
});

module.exports = AboutForm;
