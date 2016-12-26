'use strict';

var React = require('react'),
    AdminHeader = require('./components/AdminHeader'),
    AdminContent = require('./components/AdminContent');

var AdminPage = React.createClass({
  render: function() {
    return (
      <div>
        <AdminHeader />
        <AdminContent />
      </div>
    );
  }
});

React.render(
  <AdminPage />,
  document.getElementById('content')
);
