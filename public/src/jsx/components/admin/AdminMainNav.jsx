'use strict';

var React = require('react');
var NavItem = require('./../../components/admin/AdminMainNavItem');

var AdminMainNav = React.createClass({
  render: function() {
    var navlist = [
      {
        url: '#',
        icon: 'fa-user',
        type: 'user',
        divider: false,
        list: [
          {
            url: '#',
            icon: 'fa-user',
            title: 'User Profile'
          },
          {
            url: '#',
            icon: 'fa-gear',
            title: 'Settings'
          },
          {
            url: '#',
            icon: 'fa-sign-out',
            title: 'Logout',
            isLastItem: true
          }
        ]
      }
    ];
    return (
      <ul className='nav navbar-top-links navbar-right'>
      {
        navlist.map(function(nav, index) {
          return (
            <NavItem
              key={`navItem-${index}`}
              url={nav.url}
              icon={nav.icon}
              type={nav.type}
              divider={nav.divider}
              list={nav.list}
            />
          );
        })
      }
      </ul>
      // <!-- /.navbar-top-links -->
    );
  }
});

module.exports = AdminMainNav;
