// 'use strict';

// var React = require('react');
// var utils = require('../../utils/utils');

// module.exports = React.createClass({

//   getInitialState: function () {
//     return {
//       'tableId': utils.guid()
//     }
//   },

//   componentDidMount: function() {
//     var sortable = this.props.sortable || false;
//     var paginate = this.props.paginate || false;

//     var options = {
//       'responsive': true,
//       'sort': sortable,
//       'paginate': paginate
//     };

//     $('#dataTables-' + this.state.tableId).DataTable(options);
//   },

//   render: function () {

//     var props = this.props;
//     var columnsShown = this._getColumnTitles();

//     return (
//       <div className="col-lg-12">
//         <div className="panel panel-default">
//           {
//             props.title ?
//               <div className="panel-heading">
//                 { props.title }
//               </div>
//               :
//               ''
//           }
//           <div className="panel-body">
//             <div className="dataTable_wrapper">
//               <table className="table table-striped table-bordered table-hover" id={`dataTables-${this.state.tableId}`}>
//                 <thead>
//                   <tr>
//                     {
//                       columnsShown.map(function (column, index) {
//                         return (
//                           <td key={index}>{column.title}</td>
//                         );
//                       })
//                     }
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     props.rowsData.map(function (row, rowIndex) {
//                       return (
//                         <tr key={rowIndex}>
//                           {
//                             columnsShown.map(function (column, colIndex) {
//                               return (
//                                 <td key={colIndex}>{row[column.key]}</td>
//                               );
//                             })
//                           }
//                         </tr>
//                       );
//                     })
//                   }
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   },

//   _getColumnTitles: function () {

//     var columnsShown = this.props.columnsShown || [];

//     if (columnsShown.length > 0) {
//       columnsShown.map(function (column) {
//         // TODO: Should be update later
//         column.title = column.title || column.key;
//       });
//     } else {
//       var columnKeys = this.props.rowsData[0];
//       for (var key in columnKeys) {
//         if (columnKeys.hasOwnProperty(key)) {
//           columnsShown.push({ 'key': key, 'title': key });
//         }
//       }
//     }

//     return columnsShown;
//   }

// });
