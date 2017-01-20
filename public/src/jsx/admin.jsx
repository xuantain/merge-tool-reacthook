'use strict';

var React = require('react');
var AdminHeader = require('./components/admin/AdminHeader');
var AdminContent = require('./components/admin/AdminContent');

var AdminPage = React.createClass({
  render: function() {
    // TODO: require wrap AdminPage which contents all AdminPage info (AdminHeader, AdminSidebar, AdminContent)
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
