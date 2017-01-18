'use strict';

var React = require('react');
var NavItem = require('./../../components/admin/AdminMainNavItem');

module.exports = React.createClass({
  render: function() {
    var navlist = [
      {
        url: '#',
        icon: 'fa-envelope',
        type: 'messages',
        divider: true,
        list: [
          {
            url: '#',
            title: 'John Smith',
            period: 'Yesterday',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'
          },
          {
            url: '#',
            title: 'John Smith',
            period: 'Yesterday',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'
          },
          {
            url: '#',
            title: 'John Smith',
            period: 'Yesterday',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...'
          },
          {
            url: '#',
            span: 'fa fa-angle-right',
            title: 'Read All Messages',
            isLastItem: true,
            align: 'text-center',
            strong: true
          }
        ]
      },
      {
        url: '#',
        icon: 'fa-tasks',
        type: 'tasks',
        divider: true,
        list: [
          {
            url: '#',
            title: 'Task 1',
            percent: '40',
            processType: 'success',
          },
          {
            url: '#',
            title: 'Task 2',
            percent: '20',
            processType: 'info',
          },
          {
            url: '#',
            title: 'Task 3',
            percent: '60',
            processType: 'warning',
          },
          {
            url: '#',
            title: 'Task 4',
            percent: '80',
            processType: 'danger',
          },
          {
            url: '#',
            span: 'fa fa-angle-right',
            title: 'See All Tasks',
            isLastItem: true,
            align: 'text-center',
            strong: true
          }
        ]
      },
      {
        url: '#',
        icon: 'fa-bell',
        type: 'alerts',
        divider: true,
        list: [
          {
            url: '#',
            icon: 'fa-comment',
            title: 'New Comment',
            passedTime: '4 minutes ago'
          },
          {
            url: '#',
            icon: 'fa-twitter',
            title: '3 New Followers',
            passedTime: '12 minutes ago'
          },
          {
            url: '#',
            icon: 'fa-envelope',
            title: 'Message Sent',
            passedTime: '4 minutes ago'
          },
          {
            url: '#',
            icon: 'fa-tasks',
            title: 'New Task',
            passedTime: '4 minutes ago'
          },
          {
            url: '#',
            icon: 'fa-upload',
            title: 'Server Rebooted',
            passedTime: '4 minutes ago'
          },
          {
            url: '#',
            span: 'fa fa-angle-right',
            title: 'See All Alerts',
            isLastItem: true,
            align: 'text-center',
            strong: true
          }
        ]
      },
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
            <NavItem url={nav.url} icon={nav.icon} type={nav.type}
              divider={nav.divider} list={nav.list} />
          )
        })
      }
      </ul>
      // <!-- /.navbar-top-links -->
    );
  }
});
