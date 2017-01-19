'use strict';

var React = require('react');
var MenuItem = require('./../../components/admin/AdminSidebarMenuItem');

var AdminSidebar = React.createClass({

  componentDidMount: function() {
    $('#side-menu').metisMenu();
  },

  render: function() {

    var menu = [
      {
        'url': 'javascript:;',
        'title': ' Dashboard',
        'icon': 'fa fa-dashboard fa-fw'
      },
      {
        'url': 'javascript:;',
        'title': ' Charts',
        'icon': 'fa fa-bar-chart-o fa-fw',
        'span': 'fa arrow',
        'submenu': {
          'className': 'nav nav-second-level',
          'itemList': [
            {
              'url': 'javascript:;',
              'title': 'FlotCharts'
            },
            {
              'url': 'javascript:;',
              'title': 'Morris.jsCharts'
            }
          ]
        }
      },
      {
        'url': '#table',
        'title': ' Tables',
        'icon': 'fa fa-table fa-fw'
      },
      {
        'url': 'javascript:;',
        'title': ' Forms',
        'icon': 'fa fa-table fa-fw'
      },
      {
        'url': 'javascript:;',
        'title': ' UI Elements',
        'icon': 'fa fa-wrench fa-fw',
        'span': 'fa arrow',
        'submenu': {
          'className': 'nav nav-second-level',
          'itemList': [
            {
              'url': 'javascript:;',
              'title': 'Panels and Wells'
            },
            {
              'url': 'javascript:;',
              'title': 'Buttons'
            },
            {
              'url': 'javascript:;',
              'title': 'Notifications'
            },
            {
              'url': 'javascript:;',
              'title': 'Typography'
            },
            {
              'url': 'javascript:;',
              'title': 'Icons'
            },
            {
              'url': 'javascript:;',
              'title': 'Grid'
            }
          ]
        }
      },
      {
        'url': 'javascript:;',
        'title': ' Multi-Level Dropdown',
        'icon': 'fa fa-sitemap fa-fw',
        'span': 'fa arrow',
        'submenu': {
          'className': 'nav nav-second-level',
          'itemList': [
            {
              'url': 'javascript:;',
              'title': 'Second Level Item'
            },
            {
              'url': 'javascript:;',
              'title': 'Second Level Item'
            },
            {
              'url': 'javascript:;',
              'title': 'Third Level',
              'span': 'fa arrow',
              'submenu': {
                'className': 'nav nav-third-level',
                'itemList': [
                  {
                    'url': 'javascript:;',
                    'title': 'Third Level Item'
                  },
                  {
                    'url': 'javascript:;',
                    'title': 'Third Level Item'
                  },
                  {
                    'url': 'javascript:;',
                    'title': 'Third Level Item'
                  }
                ]
              }
            }
          ]
        }
      },
      {
        'url': 'javascript:;',
        'title': ' Sample Pages',
        'icon': 'fa fa-files-o fa-fw',
        'span': 'fa arrow',
        'submenu': {
          'className': 'nav nav-second-level',
          'itemList': [
            {
              'url': 'javascript:;',
              'title': 'Blank Page'
            },
            {
              'url': 'javascript:;',
              'title': 'Blank Page'
            }
          ]
        }
      }
    ];

    return (
      <div className='navbar-default sidebar' role='navigation'>
        <div className='sidebar-nav navbar-collapse'>
          <ul className='nav' id='side-menu'>
            <li className='sidebar-search'>
              <div className='input-group custom-search-form'>
                <input type='text' className='form-control' placeholder='Search...'/>
                <span className='input-group-btn'>
                  <button className='btn btn-default' type='button'>
                    <i className='fa fa-search'></i>
                  </button>
                </span>
              </div>
              {/*<!-- /input-group -->*/}
            </li>

            {
              // this.props.menuList
              menu.map( function( item, index ) {

                return (
                  <MenuItem
                    key={`menuItem-${index}`}
                    className={item.className}
                    url={item.url}
                    title={item.title}
                    icon={item.icon}
                    span={item.span}
                    submenu={item.submenu}
                  />
                );
              })
            }

          </ul>
        </div>
        {/*<!-- /.sidebar-collapse -->*/}
      </div>
      // {/*<!-- /.navbar-static-side -->*/}
    );
  }
});

module.exports = AdminSidebar;
