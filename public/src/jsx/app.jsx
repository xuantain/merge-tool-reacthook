'use strict';

var AppActions = require('./actions/AppActions'),
    AppStore = require('./stores/AppStore'),
    ProductStore = require('./stores/ProductStore'),
    React = require('react'),
    NavigationTop = require('./components/NavigationTop');

var MyApp = React.createClass({

  getInitialState: function () {
    return AppStore.getState();
  },

  componentDidMount: function () {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function () {
    var ContentTab = this.state.currentTab.content;
    return (
      <div>
        <NavigationTop
          currentTab={this.state.currentTab.key}
          tabListData={this.state.tabs}
          onChangeTab={this._changeTab}/>
        <ContentTab />
      </div>
    );
  },

  _onChange: function () {
    this.setState(AppStore.getState());
  },

  _changeTab: function (tabKey) {
    AppActions.changeTab(tabKey);
  }

});

React.render(
  <MyApp />,
  document.getElementById('content')
);
