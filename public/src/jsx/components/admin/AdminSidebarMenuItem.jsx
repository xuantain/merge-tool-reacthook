'use strict';

var React = require('react');

var MenuItem = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    url: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string,
    span: React.PropTypes.string
    // submenu: React.PropTypes.objectOf({
    //   className: React.PropTypes.string,
    //   itemList: React.PropTypes.array
    // })
  },
  getDefaultProps: function() {
    return {
      className: '',
      url: '#',
      title: '',
      icon: '',
      span: '',
      submenu: {}
    };
  },
  render: function() {
    return (
      <li className={this.props.className}>
        <a href={this.props.url}>
          { this.props.icon ? <i className={this.props.icon}></i> : '' }
          { this.props.title }
          { this.props.span ? <span className={this.props.span}></span> : '' }
        </a>
        {
          this.props.submenu && this.props.submenu !== undefined
            && this.props.submenu.hasOwnProperty('itemList')
              && this.props.submenu.itemList.length > 0 ?
            <SubMenuItem
              className={this.props.submenu.className}
              itemList={this.props.submenu.itemList}
            /> : ''
        }
      </li>
    );
  }
});

var SubMenuItem = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    itemList: React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      className: '',
      itemList: []
    };
  },
  render: function() {
    return (
      <ul className={this.props.className}>
      {
        this.props.itemList.map(function(item, index) {
          return (
            <MenuItem
              key={'item'+index}
              className={item.className}
              url={item.url}
              icon={item.icon}
              title={item.title}
              span={item.span}
            />
          );
        })
      }
      </ul>
    );
  }
});

var AdminSidebarMenuItem = React.createClass({
  render: function() {
    return (
      <MenuItem
        className={this.props.className}
        url={this.props.url}
        title={this.props.title}
        icon={this.props.icon}
        span={this.props.span}
        submenu={this.props.submenu}
      />
    );
  }
});

module.exports = AdminSidebarMenuItem;
