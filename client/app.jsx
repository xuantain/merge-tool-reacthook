// 'use strict';

// import AppActions from './actions/AppActions';
// import AppStore from './stores/AppStore';
// import ProductStore from './stores/ProductStore';

// // components
// import React from 'react';
// import NavigationTop from './components/common/NavigationTop';

// function MyApp() {

//   getInitialState: function () {
//     return AppStore.getState();
//   },

//   componentDidMount: function () {
//     AppStore.addChangeListener(this._onChange);
//   },

//   componentWillUnmount: function() {
//     AppStore.removeChangeListener(this._onChange);
//   },

//   render: function () {
//     var ContentTab = this.state.currentTab.content;
//     return (
//       <div>
//         <NavigationTop
//           currentTab={this.state.currentTab.key}
//           tabListData={this.state.tabs}
//           onChangeTab={this._changeTab}/>
//         <ContentTab />
//       </div>
//     );
//   },

//   _onChange: function () {
//     this.setState(AppStore.getState());
//   },

//   _changeTab: function (tabKey) {
//     AppActions.changeTab(tabKey);
//   }

// });

// export default MyApp;
