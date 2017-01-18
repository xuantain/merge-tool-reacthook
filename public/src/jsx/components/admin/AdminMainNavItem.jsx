'use strict';

var React = require('react');

var MessageType = React.createClass({
  render: function() {
    return (
      <li>
        <a href={this.props.data.url}>
          <div>
            <strong>{this.props.data.title}</strong>
            <span className='pull-right text-muted'>
              <em>{this.props.data.period}</em>
            </span>
          </div>
          <div>{this.props.data.content}</div>
        </a>
      </li>
    );
  }
});

var TaskType = React.createClass({
  render: function() {
    return (
      <li>
        <a href={this.props.data.url}>
          <div>
            <p>
              <strong>{this.props.data.title}</strong>
              <span className='pull-right text-muted'>{this.props.data.percent +'% Complete'}</span>
            </p>
            <div className='progress progress-striped active'>
              <div className={'progress-bar progress-bar-'+ this.props.data.processType} role='progressbar' aria-valuenow='40' aria-valuemin='0' aria-valuemax='100' style={{'width': this.props.data.percent +'%'}}>
                <span className='sr-only'>{this.props.data.percent +'% Complete'}</span>
              </div>
            </div>
          </div>
        </a>
      </li>
    );
  }
});

var AlertType = React.createClass({
  render: function() {
    return (
      <li>
        <a href={this.props.data.url}>
          <div>
            <i className={'fa '+ this.props.data.icon +' fa-fw'}></i>  {this.props.data.title}
            <span className='pull-right text-muted small'>{this.props.data.passedTime}</span>
          </div>
        </a>
      </li>
    );
  }
});

var UserType = React.createClass({
  render: function() {
    return (
      <li>
        <a href={this.props.data.url}>
          <i className={'fa '+ this.props.data.icon +' fa-fw'}></i>  {this.props.data.title}
        </a>
      </li>
    );
  }
});

var LastType = React.createClass({
  render: function() {
    var textAlign = this.props.data.align;
    var isStrong = this.props.data.strong;
    return (
      <li>
        <a className={textAlign} href={this.props.data.url}>
          { this.props.data.icon ? <i className={'fa '+ this.props.data.icon +' fa-fw'}></i> : '' }
          { isStrong ? <strong>  {this.props.data.title}  </strong> : <span>  {this.props.data.title}  </span> }
          { this.props.data.span ? <i className={'fa '+ this.props.data.span}></i> : '' }
        </a>
      </li>
    )
  }
});

module.exports = React.createClass({
  renderSubNav: function() {
    var subNavContent = '';

    if(this.props.list && this.props.list !== undefined && this.props.list.length > 0) {
      var SubNavItem;

      switch (this.props.type) {
        case 'messages':
          SubNavItem = MessageType;
          break;
        case 'tasks':
          SubNavItem = TaskType;
          break;
        case 'alerts':
          SubNavItem = AlertType;
          break;
        case 'user':
          SubNavItem = UserType;
          break;
      }

      var navList = this.props.list.map(function(subNavData, index) {
        var navReturn = '';

        if(subNavData.isLastItem) {
          navReturn = <LastType key={'SubNavItem-'+ index} data={subNavData} />;
        } else {
          navReturn = <SubNavItem key={'SubNavItem-'+ index} data={subNavData} />;
        }

        return ({ navReturn })
      });
      var navListReturn = [];

      for (var i = 0; i < navList.length; i++) {
        if ( (this.props.divider && 0 !== i) || navList.length === i+1 ) {
          navListReturn.push(<li className='divider'></li>);
        }
        navListReturn.push(navList[i]);
      }

      subNavContent = (
        <ul className={'dropdown-menu dropdown-'+ this.props.type}>
          { navListReturn }
        </ul>
      );
    }

    return subNavContent;
  },
  render: function() {
    return (
      <li className='dropdown'>
        <a className='dropdown-toggle' data-toggle='dropdown' href={this.props.url}>
          <i className={'fa '+ this.props.icon +' fa-fw'}></i>  <i className='fa fa-caret-down'></i>
        </a>
        { this.renderSubNav() }
      </li>
    );
  }
});
