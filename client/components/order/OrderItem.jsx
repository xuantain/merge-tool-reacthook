// 'use strict';

// var React = require('react');
// var OrderExportItemRow = require('./OrderExportItemRow');

// var OrderItem = React.createClass({

//   getInitialState: function () {
//     return ({
//       isShowDetail: false
//     });
//   },

//   render: function () {
//     return (
//       this.state.isShowDetail ?
//         <OrderDetail showDetail={this._showDetail} order={this.props.order}/>
//         :
//         <OrderInfo showDetail={this._showDetail} order={this.props.order}/>
//     );
//   },

//   _showDetail: function () {
//     $('tr#'+this.props.order._id).slideToggle();
//     this.setState({ isShowDetail: !this.state.isShowDetail });
//   }

// });

// var OrderInfo = React.createClass({

//   render: function () {
//     var order = this.props.order;
//     return (
//       <tr id={order._id} onClick={this.props.showDetail}>
//         <td>{this.props.index}</td>
//         <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//         <td>{order.shopName}</td>
//         <td>{order.orderStatus}</td>
//         <td>{parseInt(order.amount).toLocaleString('en-IN', { maximumSignificantDigits: 3 })}</td>
//         <td>{order.customerNote}</td>
//       </tr>
//     );
//   }

// });

// var OrderDetail = React.createClass({

//   render: function () {
//     var order = this.props.order;
//     return (
//       <tr id={order._id}>
//         <td colSpan='7'>
//           <div className='panel panel-default'>
//             <div className='panel-heading heading-button' onClick={this.props.showDetail}>
//               Order Detail
//             </div>
//             <fieldset>
//               <TextInfo styleClass='pull-left' title='Shop Name' value={order.shopName}/>
//               <TextInfo styleClass='pull-right' title='Customer Name' value={order.customerName}/>

//               <TextInfo styleClass='pull-left' title='Order Status' value={order.orderStatus}/>
//               <TextInfo styleClass='pull-right' title='Customer Phone' value={order.customerPhone}/>

//               <TextInfo styleClass='pull-left' title='Order Date' value={new Date(order.createdAt).toLocaleDateString()}/>
//               <TextInfo styleClass='pull-right' title='Customer Address' value={order.customerAddress}/>

//               <TextInfo styleClass='pull-left' title='Billing Date' value={new Date(order.billingDate).toLocaleDateString()}/>
//               <TextInfo styleClass='pull-right' title='Customer Note' value={order.customerNote}/>
//             </fieldset>
//             <OrderDetailItemList orderItems={order.orderItems}/>
//           </div>
//         </td>
//       </tr>
//     );
//   }

// });

// var TextInfo = React.createClass({

//   render: function () {
//     return (
//       <div className={'input-group col-xs-6 col-sm-6 '+this.props.styleClass}>
//         <span className='input-group-addon w20'>{this.props.title}</span>
//         <input className='form-control disabled' value={this.props.value}/>
//       </div>
//     )
//   }

// });

// var OrderDetailItemList = React.createClass({

//   render: function () {
//     var totalAmount = 0;

//     var content = this.props.orderItems.map(function(orderItem, index) {
//       totalAmount += parseInt(orderItem.amount);
//       return (
//         <tr key={'orderItem-'+orderItem._id}>
//           <td>{index + 1}</td>
//           <td>{orderItem.category}</td>
//           <td>{orderItem.product.productName}</td>
//           <td>{this._formatCurrency(orderItem.quantity)}</td>
//           <td>{this._formatCurrency(orderItem.price)}</td>
//           <td>{this._formatCurrency(orderItem.amount)}</td>
//           <td>{orderItem.discount}</td>
//           <td>{orderItem.note}</td>
//         </tr>
//       )}.bind(this)
//     );

//     return (
//       <table className='table table-bordered table-striped menu-items'>
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>Category</th>
//             <th>Product</th>
//             <th>Quatity</th>
//             <th>Price out</th>
//             <th>Amount</th>
//             <th>Discount</th>
//             <th>Note</th>
//           </tr>
//         </thead>
//         <tbody>
//           { content }
//           <tr>
//             <td colSpan='5'>Total: </td>
//             <td>{ this._formatCurrency(totalAmount) }</td>
//             <td colSpan='2'></td>
//           </tr>
//         </tbody>
//       </table>
//     );
//   },

//   _formatCurrency: function (number) {
//     number = number ? number : 0;
//     return parseInt(number).toLocaleString('en-IN', { maximumSignificantDigits: 3 });
//   }

// });

// module.exports = OrderItem;
