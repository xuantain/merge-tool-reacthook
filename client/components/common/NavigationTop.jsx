// 'use strict';

// var React = require('react');

// module.exports = React.createClass({
//   changeTab: function(tabKey, e) {
//     e.preventDefault();

//     this.props.onChangeTab(tabKey);
//   },
//   remainingClassName: function(tab) {
//     return this.props.currentTab === tab.key ? 'active' : '';
//   },
//   render: function() {
//     return (
//       <div className='col-xs-12 col-sm-12'>
//         <ul className='nav nav-tabs'>
//         {
//           this.props.tabListData.map(function(tab) {
//             return (
//               <li key={'tab-'+tab.key} className={this.remainingClassName(tab)}>
//                 <a href='' onClick={this.changeTab.bind(null, tab.key)}>{tab.key}</a>
//               </li>
//             )
//           }, this)
//         }
//         </ul>
//       </div>
//     )
//   }
// });
